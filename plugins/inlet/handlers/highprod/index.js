var Boom = require('boom');
var highprod = require('./highprod.json');

module.exports.get = function (request, reply) {
  return reply(highprod);
};

