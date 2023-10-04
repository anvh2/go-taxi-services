/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');
const Customer = require('@services/user-management/models/Customer');
const { OK, INVALID_PAYLOAD, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('@common/constants/codes');

const validator = [
  {
    id: 'check_password_empty',
    func: (request, errors) => {
      const { customer_id, password } = request.body;
      if (!customer_id || customer_id === '') {
        errors.push('customer_id is empty');
        return false;
      } else if (!password || password === '') {
        errors.push('password is empty');
        return false;
      } else {
        return true;
      }
    }
  }
];

class AccountController {
  constructor (logger) {
    this.logger = logger;
    this.changePassword = this.changePassword.bind(this);
  }

  async changePassword (req, res) {
    const errors = [];
    for (const rule of validator) {
      if (rule.id === 'check_password_empty') {
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

    const { customer_id, password } = req.params;

    try {
      const customer = Customer.findOne({
        where: customer_id
      });
      if (!customer) {
        const error = {
          status: NOT_FOUND,
          message: 'Customer not found'
        };
        res.status(error.status).json({ error });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const updated = await Customer.update(
        { password: hash },
        { where: customer_id }
      );
      if (!updated) {
        const error = {
          status: FORBIDDEN,
          message: 'Change password failed'
        };
        res.status(error.status).json({ error });
        return;
      }

      res.status(OK);
    } catch (err) {
      logger.error('[Customer][Account] error ' + err);
      const error = {
        status: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        details: err
      };
      res.status(error.status).json({ error });
    }
  }
}

module.exports = AccountController;
