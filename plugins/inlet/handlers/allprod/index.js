var Boom = require('boom');
var allprod = require('./allprod.json');

module.exports.get = function (request, reply) {
  return reply(allprod);
};

