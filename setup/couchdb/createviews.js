var url = require('url');

module.exports = function(host, db, cb) {
  var nano = require('nano')(url.resolve(host, db));
  nano.insert({
    views: {
      allproducts: {
        map: function(doc) {
          if (doc.type === 'product') {
            emit(doc._id, doc);
          }
        }
      } 
    }
  }, '_design/products', cb);
};
