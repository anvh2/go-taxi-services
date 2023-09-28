const CustomerController = require('@services/user-management/controllers');
const controller = new CustomerController();

const routes = [
  {
    method: 'POST',
    path: '/v1/customer/register',
    access: 'public',
    handler: controller.register
  },
  {
    method: 'POST',
    path: '/v1/customer/login',
    access: 'public',
    handler: controller.login
  },
  {
    method: 'PUT',
    path: '/v1/customer/update-password',
    access: 'private',
    handler: controller.updatePassword
  },
  {
    method: 'GET',
    path: '/v1/customer/profile',
    access: 'private',
    handler: controller.getProfile
  },
  {
    method: 'PUT',
    path: '/v1/customer/profile',
    access: 'private',
    handler: controller.updateProfile
  }
];

module.exports = routes;
