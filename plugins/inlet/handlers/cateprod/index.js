var Boom = require('boom');
var cateprod = require('./cateprod.json');

module.exports.get = function (request, reply) {
  return reply(cateprod);
};

