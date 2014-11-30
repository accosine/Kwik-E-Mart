var config = require('./config');

var server = {
  debug: config.get('/debug'),
  cache: config.get('/cache')
};

var connection = {
  port: config.get('/server/port')
};

module.exports.server = server;
module.exports.connection = connection;
