var Boom = require('boom');

var prefix = 'product-';

module.exports.get = function (request, reply) {
  var productID = prefix + encodeURIComponent(request.params.productID);
  console.log('GET Product with ID:', productID);
  request.server.methods.couch.get(productID,
      function (err, body, headers) {
    if (err) {
      return reply(Boom.notFound('Document not found'));
    }
    else {
      body._id = body._id.split(prefix)[1];
      return reply(body);
    }
  });
};

module.exports.post = function (request, reply) {
  var productID = prefix + encodeURIComponent(request.params.productID);
  request.payload.type = 'product';

  console.log('POST Product with ID:', productID);
  request.server.methods.couch.insert(request.payload, productID,
      function (err, body, headers) {
    return reply(body);
  });
};

module.exports.delete = function (request, reply) {
  var productID = prefix + encodeURIComponent(request.params.productID);
  console.log('DELETE Product with ID:', productID);
  request.server.methods.couch.get(productID,
      function (err, body, headers) {
    request.server.methods.couch.destroy(productID, body._rev,
        function (err, body, headers) {
      return reply(body);
    });
  });
};

module.exports.put = function (request, reply) {
  var productID = prefix + encodeURIComponent(request.params.productID);
  request.payload.type = 'product';

  console.log('PUT Product with ID:', productID);
  request.server.methods.couch.get(productID,
      function (err, body, headers) {
    if (err && err.error === 'not_found') {
      return reply(Boom.notFound('Cannot update non-existing document'));
    }
    else if (err) {
      return reply(err);
    }
    request.payload._rev = body._rev;
    request.server.methods.couch.insert(request.payload, productID,
        function (err, body, headers) {
      if (err) {
        return reply(err);
      }
      return reply(body);
    });
  });
};
