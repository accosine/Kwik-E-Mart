module.exports = function (request, reply) {
  request.auth.session.clear();
  reply.redirect(this.redirectOnSuccess);
};
