/* eslint-disable no-undef */
/* eslint-disable camelcase */
const Customer = require('@services/user-management/models/Customer');
const { OK, INVALID_PAYLOAD, INTERNAL_SERVER_ERROR } = require('@common/constants/codes');

const validator = [
  {
    id: 'check_empty',
    func: (request, errors) => {
      const { full_name, email, phone } = request.body;
      if (!full_name || full_name === '') {
        errors.push('full_name is empty');
        return false;
      } else if (!email || email === '') {
        errors.push('email is empty');
        return false;
      } else if (!phone || phone === '') {
        errors.push('phone is empty');
        return false;
      } else {
        return true;
      }
    }
  }
];

class RegisterController {
  constructor (logger) {
    this.logger = logger;
    this.register = this.register.bind(this);
  }

  async register (req, res) {
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

    const { full_name, email, phone } = req.body;

    try {
      const [customer, created] = await Customer.findOrCreate({
        where: { phone },
        defaults: { full_name, email }
      });
      if (created && customer.verified) {
        const error = {
          status: INVALID_PAYLOAD,
          message: 'Phone is registered'
        };
        res.status(error.status).json({ error });
        return;
      }

      customer.email = email;
      customer.full_name = full_name;
      await customer.save();

      // send otp
      res.status(OK).json(customer);
    } catch (err) {
      logger.error('[Customer][Register] error ' + err);
      const error = {
        status: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        details: err
      };
      res.status(error.status).json({ error });
    }
  }
}

module.exports = RegisterController;
