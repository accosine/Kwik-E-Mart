exports.register = function(server, options, next) {
  server.dependency('hapi-justify', function(server, next) {

    server.route([
      {
        method: 'GET',
        path: '/{param*}',
        config: {
          handler: {
            proxy: {
              host: 'localhost',
              port: 8081,
              protocol: 'http',
              passThrough: true,
              xforward: true
            }
          }
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

