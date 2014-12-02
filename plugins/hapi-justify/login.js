module.exports = function (request, reply) {
  if (request.auth.isAuthenticated) {
    return reply.redirect('/');
  }

  var message = '';
  var account = null;

  if (request.method === 'post') {
    if (!request.payload.username || !request.payload.password) {
      message = 'Missing username or password';
    }
    else {
      account = users[request.payload.username];
      if (!account || account.password !== request.payload.password) {
        message = 'Invalid username or password';
      }
    }
  }

  if (request.method === 'get' || message) {
    return reply.view('login', {message: message});
  }

  request.auth.session.set(account);
  reply.redirect('/');
};
