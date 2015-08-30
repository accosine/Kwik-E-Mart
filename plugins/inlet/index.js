var routes = require('./routes');

exports.register = function (server, options, next) {
  server.dependency('hapi-justify', function (server, next) {

    server.route([].concat(routes));

    return next();
  });

  return next();
};


exports.register.attributes = {
  pkg: require('./package.json')
};

