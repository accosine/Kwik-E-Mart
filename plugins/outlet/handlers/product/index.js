var Boom = require('boom');

module.exports.get = function (request, reply) {
  var productID = encodeURIComponent(request.params.productID);
  console.log('GET Product with ID:', productID);
  request.server.methods.couch.get(request.params.productID,
      function (err, body, headers) {
    if (err) {
      return reply(Boom.notFound('Document not found'));
    }
    else {
      return reply(body);
    }
  });
};

module.exports.post = function (request, reply) {
  var productID = encodeURIComponent(request.params.productID);
  console.log('POST Product with ID:', productID);
  request.server.methods.couch.insert(request.payload, productID,
      function (err, body, headers) {
    return reply(body);
  });
};

module.exports.delete = function (request, reply) {
  var productID = encodeURIComponent(request.params.productID);
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
  var productID = encodeURIComponent(request.params.productID);
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
