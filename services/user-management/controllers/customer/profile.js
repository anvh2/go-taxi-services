/* eslint-disable no-undef */
/* eslint-disable camelcase */
const Customer = require('@services/user-management/models/Customer');
const { OK, INVALID_PAYLOAD, INTERNAL_SERVER_ERROR, NOT_FOUND, FORBIDDEN } = require('@common/constants/codes');

const validator = [
  {
    id: 'check_customer_id_empty',
    func: (request, errors) => {
      const { customer_id } = request.query;
      if (!customer_id || customer_id === '') {
        errors.push('customer_id is empty');
        return false;
      } else {
        return true;
      }
    }
  }
];

class ProfileController {
  constructor (logger) {
    this.logger = logger;
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
  }

  async get (req, res) {
    const errors = [];
    for (const rule of validator) {
      if (rule.id === 'check_customer_id_empty') {
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

    const { customer_id } = req.query;

    try {
      const customer = await Customer.findOne({
        where: { customer_id }
      });
      if (!customer) {
        const error = {
          status: NOT_FOUND,
          message: 'Customer not found'
        };
        res.status(error.status).json({ error });
        return;
      }

      const profile = {
        customer_id: customer.customer_id,
        full_name: customer.full_name,
        phone: customer.phone,
        email: customer.email,
        avatar: customer.avatar,
        dob: customer.dob
      };

      res.status(OK).json({ profile });
    } catch (err) {
      logger.error('[Customer][Profile] error ' + err);
      const error = {
        status: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        details: err
      };
      res.status(error.status).json({ error });
    }
  }

  async update (req, res) {
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

    const { customer_id, full_name, dob, avatar } = req.body;

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

      const updated = await Customer.update(
        { full_name, dob, avatar },
        { where: customer_id }
      );
      if (!updated) {
        const error = {
          status: FORBIDDEN,
          message: 'Update failed'
        };
        res.status(error.status).json({ error });
        return;
      }

      res.status(OK);
    } catch (err) {
      logger.error('[Customer][Profile] error ' + err);
      const error = {
        status: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        details: err
      };
      res.status(error.status).json({ error });
    }
  }
}

module.exports = ProfileController;
