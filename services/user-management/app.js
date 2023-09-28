require('../../alias');

const Server = require('@library/server');
const routes = require('@services/user-management/routes');

const server = new Server();
server.addRoutes(routes);
server.start(3000);
