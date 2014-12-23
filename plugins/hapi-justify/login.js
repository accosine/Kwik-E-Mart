var couchreq = require('request')
  , path = require('path');

module.exports = function (request, reply) {
  var that = this
  , message = ''
  , url = 'http://' + path.join(this.host, this.database, this.adminprefix);

  function fetchAndMatchCredentials(request, reply) {
    couchreq({
      url: url + request.payload.username,
      json: true
    }, function (error, response, credentials) { // Callback after Couch resp.
      // If Couch response is 200 and passwords don't match, reply with error
      if (!error && response.statusCode == 200 &&
          credentials.password !== request.payload.password) {
        message = 'Invalid username or password';
      return reply.view('login', {message: message});
      }
      // If Couch response is 200 and passwords match, authenticate
      else if (!error && response.statusCode == 200 &&
               credentials.password === request.payload.password) {
        // Cache session in redis, '0' ttl loads global configuration
        request.server.app.cache.set(credentials._rev, {account: credentials}, 0,
            function (err) {
          if (err) {
            reply(err);
          }

          request.auth.session.set({ sid: credentials._rev });
          return reply.redirect(that.redirectOnSuccess);
        });
      }

      // Something is rotten in the state of Denmark
      else {
        message = 'Invalid username or password';
        return reply.view('login', {message: message});
      }
    });
  }

  // If authenticated, redirect to '/'
  if (request.auth.isAuthenticated) {
    return reply.redirect(this.redirectOnSuccess);
  }

  if (request.method === 'post') {
    // If either username or password are missing, reply with error message
    if (!request.payload.username || !request.payload.password) {
      message = 'Missing username or password';
      return reply.view('login', {message: message});
    }
    // Ask CouchDB for admin credential data
    else {
      fetchAndMatchCredentials(request, reply);
    }
  }

  if (request.method === 'get') {
    return reply.view('login');
  }

};
