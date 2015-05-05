var Boom = require('boom');

module.exports.get = function (request, reply) {
  console.log('GET Products with query:', request.query);
  reply(request.query);
  //request.server.methods.couch.get(request.params.productID,
      //function (err, body, headers) {
    //if (err) {
      //return reply(Boom.notFound('Document not found'));
    //}
    //else {
      //return reply(body);
    //}
  //});
};
