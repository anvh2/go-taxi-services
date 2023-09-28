const routes = [
  {
    method: 'POST',
    path: '/v1/booking/book',
    access: 'private',
    handler: null
  },
  {
    method: 'POST',
    path: '/v1/booking/scheduled/book',
    access: 'private',
    handler: null
  },
  {
    method: 'GET',
    path: '/v1/booking/:booking',
    access: 'private',
    handler: null
  },
  {
    method: 'GET',
    path: '/v1/booking/status',
    access: 'private',
    handler: null
  },
  {
    method: 'PUT',
    path: '/v1/booking/cancel',
    access: 'private',
    handler: null
  },
  {
    method: 'GET',
    path: '/v1/booking/history',
    access: 'private',
    handler: null
  },
  {
    method: 'GET',
    path: '/v1/booking/recent',
    access: 'private',
    handler: null
  },
  {
    method: 'GET',
    path: '/v1/booking/vehicle-pricing',
    access: 'private',
    handler: null
  },
  {
    method: 'GET',
    path: '/v1/booking/payment-method',
    access: 'private',
    handler: null
  }
];

module.exports = routes;
