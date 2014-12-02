var Hapi = require('hapi')
  , options = require('./options');

var server = new Hapi.Server(options.server);

server.connection(options.connection);

if (!module.parent) {
  server.start(function (err) {
    if (err) {
      throw err;
    }
    console.log('Server started at: ' + server.info.uri);
  });
}

module.exports.server = server;

