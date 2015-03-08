exports.register = function (server, options, next) {
  server.dependency('hapi-justify', function (server, next) {

    server.route([
      {
        method: 'GET',
        path: '/admin/{param*}',
        config: {
          handler: {
            directory: {
              path: __dirname + '/www',
              index: true
            }
          },
          auth: 'session'
        }
      },
      {
        method: 'GET',
        path: '/test',
        config: {
          handler: function (request, reply) { reply('Hello, world!'); },
          //auth: 'session'
        }
      }
    ]);

    return next();
  });

  return next();
};


exports.register.attributes = {
  pkg: require('./package.json')
};

