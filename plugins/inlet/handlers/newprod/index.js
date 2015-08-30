var Boom = require('boom');
var newprod = require('./newprod.json');

module.exports.get = function (request, reply) {
  return reply(newprod);
};

