var couchreq = require('request');

module.exports = function (request, reply) {
  if (request.auth.isAuthenticated) {
    return reply.redirect('/');
  }
  var message = '';

  if (request.method === 'post') {
    if (!request.payload.username || !request.payload.password) {
      message = 'Missing username or password';
      return reply.view('login', {message: message});
    }
    else {
      couchreq({
        url: 'http://127.0.0.1:5984/kwik-e-mart/admin-' +
          request.payload.username,
        json: true
      }, function (error, response, credentials) {
        if (!error && response.statusCode == 200 &&
            credentials.password !== request.payload.password) {
          message = 'Invalid username or password';
          return reply.view('login', {message: message});
        }
        else if (!error && response.statusCode == 200 &&
            credentials.password === request.payload.password) {
          request.server.app.cache.set(credentials._rev,
              { account: credentials }, 0, function (err) {
            if (err) {
              reply(err);
            }

            request.auth.session.set({ sid: credentials._rev });
            return reply.redirect('/');
          });
        }
        else {
          message = 'Invalid username or password';
          return reply.view('login', {message: message});
        }
      });
    }
  }

  if (request.method === 'get') {
    return reply.view('login');
  }

};
