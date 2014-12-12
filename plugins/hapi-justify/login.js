module.exports = function (request, reply) {
  var uuid = 1;       // Use seq instead of proper unique identifiers for demo only

  var users = {
    john: {
      id: 'john',
      password: 'password',
      name: 'John Doe',
      color: 'red'
    }
  };
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

    var sid = String(++uuid);
    request.server.app.cache.set(sid, { account: account }, 0, function (err) {
      if (err) {
          reply(err);
      }

      request.auth.session.set({ sid: sid });
      return reply.redirect('/');
    });
};
