/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const { getConfig } = require('@common/utils/config');
const Customer = require('@services/user-management/models/Customer');
const { OK, INVALID_PAYLOAD, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('@common/constants/codes');
const { encrypt, decrypt } = require('@common/utils/crypto');
const { redis } = require('@common/database/redis');
const { generateOTP } = require('@common/utils/otp');

const validator = [
  {
    id: 'check_phone',
    func: (request, errors) => {
      const { phone } = request.body;
      if (!phone || phone === '') {
        errors.push('phone is empty');
        return false;
      } else {
        return true;
      }
    }
  },
  {
    id: 'check_otp',
    func: (request, errors) => {
      const { otp } = request.body;
      if (!otp || otp === '') {
        errors.push('otp is empty');
        return false;
      } else {
        return true;
      }
    }
  }
];

class LoginController {
  constructor (logger) {
    this.logger = logger;
    this.login = this.login.bind(this);
    this.verify = this.verify.bind(this);
  }

  async login (req, res) {
    const errors = [];
    for (const rule of validator) {
      if (rule.id === 'check_phone') {
        rule.func(req, errors);
      }
    }

    if (errors.length > 0) {
      const error = {
        status: INVALID_PAYLOAD,
        message: 'Invalid request',
        details: errors
      };
      res.status(error.status).json({ error });
      return;
    }

    const { phone } = req.body;

    try {
      const customer = await Customer.findOne({
        where: { phone }
      });

      if (!customer) {
        this.logger.error('[Customer][Login] phone not found ' + phone);
        res.status(NOT_FOUND).json({
          error: {
            status: NOT_FOUND,
            message: 'Customer not found'
          }
        });
        return;
      }

      const otp = generateOTP();
      const prefix = getConfig('common.redis.otp');
      const token = encrypt(otp, getConfig('common.secret.otp'));
      await redis.set(`${prefix}${phone}`, token, 'EX', 10 * 60); // 10 minutes

      // TODO: implement send otp
      res.status(OK).json({ otp }); // TODO: temporary return to response
    } catch (error) {
      this.logger.error('[Customer][Login] error ' + error);
      res.status(INTERNAL_SERVER_ERROR).json({
        error: {
          status: INTERNAL_SERVER_ERROR,
          message: 'Internal server error'
        }
      });
    }
  }

  async verify (req, res) {
    const errors = [];
    for (const rule of validator) {
      rule.func(req, errors);
    }

    if (errors.length > 0) {
      const error = {
        status: INVALID_PAYLOAD,
        message: 'Invalid request',
        details: errors
      };
      res.status(error.status).json({ error });
      return;
    }

    const { phone, otp } = req.body;

    try {
      const customer = await Customer.findOne({
        where: { phone }
      });

      if (!customer) {
        this.logger.error('[Customer][Login] phone not found ' + phone);
        res.status(NOT_FOUND).json({
          error: {
            status: NOT_FOUND,
            message: 'Customer not found'
          }
        });
        return;
      }
      this.logger.info('[Customer][Login] customer ' + customer);

      const prefix = getConfig('common.redis.otp');
      const otpToken = await redis.get(`${prefix}${phone}`);

      const otpData = decrypt(otpToken, getConfig('common.secret.otp'));
      if (otp !== otpData.otp) {
        const error = {
          status: INVALID_PAYLOAD,
          message: 'OTP invalid'
        };
        res.status(error.status).json({ error });
        return;
      }

      const deleted = await redis.del(prefix);
      if (deleted !== 1) {
        const error = {
          status: NOT_FOUND,
          message: 'OTP not found or expired'
        };
        res.status(NOT_FOUND).json({ error });
        return;
      }

      const payload = {
        id: customer.customer_id,
        phone: customer.phone,
        eat: Date.now() + 24 * 60 * 60 * 1000
      };

      const secretKey = getConfig('common.secret.authen');
      const token = jwt.sign(payload, secretKey);

      res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      res.status(OK).json({ token });
    } catch (error) {
      this.logger.error('[Customer][Login] error ' + error);
      res.status(INTERNAL_SERVER_ERROR).json({
        error: {
          status: INTERNAL_SERVER_ERROR,
          message: 'Internal server error'
        }
      });
    }
  }
}

module.exports = LoginController;
