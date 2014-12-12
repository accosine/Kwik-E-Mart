module.exports = function (request, reply) {
  reply.view('welcome', {name: request.auth.credentials.name, color: request.auth.credentials.color});
};
