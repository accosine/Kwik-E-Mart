var url = require('url');
var products = require('./products').products;

module.exports = function(host, db, prefix, cb) {
  var nano = require('nano')(url.resolve(host, db));
  var counter = products.length;
  products.forEach(function(product, index, products) {
    product._id = prefix + product._id;
    product.type = 'product';
    nano.insert(product, function(err, body, headers) {
      counter--;
      if (counter === 0) {
        cb(err, body, headers);
      }
    });
  });
};
