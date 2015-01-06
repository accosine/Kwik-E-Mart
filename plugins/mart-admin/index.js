exports.register = function (server, options, next) {
  server.dependency('hapi-justify', function (server, next) {

    server.route([
      {
        method: 'GET',
        path: '/',
        config: {
          handler: function (request, reply) { reply('Hello, world!'); },
          auth: 'session'
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

