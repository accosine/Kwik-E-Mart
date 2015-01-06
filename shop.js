var Hapi = require('hapi')
  , options = require('./options')
  , plugins = require('./plugins');

var server = new Hapi.Server(options.server);

server.views(options.views);
server.connection(options.connection);

plugins(server);

if (!module.parent) {
  server.start(function (err) {
    if (err) {
      throw err;
    }
    console.log('Server started at: ' + server.info.uri);
  });
}
module.exports.server = server;

