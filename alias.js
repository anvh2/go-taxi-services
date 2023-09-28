/* eslint-disable n/no-path-concat */
const moduleAlias = require('module-alias');
moduleAlias.addAliases({
  '@common': __dirname + '/common',
  '@library': __dirname + '/library',
  '@services': __dirname + '/services'
});
