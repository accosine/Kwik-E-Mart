var config = require('./config');

var server = {
  cache: {
    engine: require(config.get('/cache/engine')),
    options: {
      host: config.get('/cache/host'),
      port: config.get('/cache/port'),
      password: config.get('/cache/password')
    }
  }
  //debug: { request: ['error']}
};

var connection = {
  port: config.get('/server/port')
};

module.exports.server = server;
module.exports.connection = connection;
