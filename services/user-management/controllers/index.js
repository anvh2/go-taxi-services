const jwt = require('jsonwebtoken');
const { getConfig } = require('@common/utils/config');
const Logger = require('@library/logger');
const Customer = require('@services/user-management/models/Customer');
const { OK, INVALID_PAYLOAD, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('@common/constants/codes');

const logger = new Logger('logs', 'user-management');

class CustomerController {
  register (req, res) {

  }

  async login (req, res) {
    const { phone } = req.body;
    if (!phone) {
      res.status(INVALID_PAYLOAD).json({
        error: {
          status: INVALID_PAYLOAD,
          message: 'Invalid phone!'
        }
      });
      return;
    }

    try {
      const customer = await Customer.findOne({
        where: { phone }
      });

      if (!customer) {
        logger.error('[Customer][Login] phone not found ' + phone);
        res.status(NOT_FOUND).json({
          error: {
            status: NOT_FOUND,
            message: 'Customer not found'
          }
        });
        return;
      }

      logger.info('[Customer][Login] customer ' + customer);

      const payload = {
        id: customer.customer_id,
        phone: customer.phone,
        eat: Date.now() + 24 * 60 * 60 * 1000
      };

      const secretKey = getConfig('system.token.secret');
      const token = jwt.sign(payload, secretKey);

      res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      res.status(OK).json({ token });
    } catch (error) {
      logger.error('[Customer][Login] error ' + error);
      res.status(INTERNAL_SERVER_ERROR).json({
        error: {
          status: INTERNAL_SERVER_ERROR,
          message: 'Internal server error'
        }
      });
    }
  }

  updatePassword (req, res) {

  }

  getProfile (req, res) {
    res.status(200).json({ error: 'Success' });
  }

  updateProfile (req, res) {

  }
}

module.exports = CustomerController;
