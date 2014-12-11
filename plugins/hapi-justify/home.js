module.exports = function (request, reply) {
  reply.view('welcome', {title: request.auth.credentials.name});
};
