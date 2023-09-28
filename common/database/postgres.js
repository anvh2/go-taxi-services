const { Sequelize } = require('sequelize');
const { getConfig } = require('@common/utils/config');

// Create a Sequelize instance with the database credentials
const sequelize = new Sequelize(
  {
    dialect: 'postgres',
    host: getConfig('system.database.host'),
    username: getConfig('system.database.username'),
    password: getConfig('system.database.password'),
    database: getConfig('system.database.database')
  }
);

module.exports.sequelize = sequelize;
