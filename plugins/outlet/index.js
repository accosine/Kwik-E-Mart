var product = require('./routes/product');
var products = require('./routes/products');
var search = require('./routes/search');

exports.register = function (server, options, next) {
  server.dependency('hapi-justify', function (server, next) {

    server.route([].concat(product, products, search));

    return next();
  });

  return next();
};


exports.register.attributes = {
  pkg: require('./package.json')
};

