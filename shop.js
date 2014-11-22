var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
  port: 8080
});

server.start(function (err) {
  console.log('Server started at: ' + server.info.uri);
});
