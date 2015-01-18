var couchreq = require('request')
  , path = require('path')
  , crypto = require('crypto');

module.exports = function (request, reply) {
  var that = this
  , message = ''
  , couchurl = 'http://' + path.join(this.host, this.database, this.adminprefix);


  function fetchAndMatchCredentials(request, reply) {
    couchreq({
      url: couchurl + request.payload.username,
      json: true
    }, function (error, response, credentials) { // Callback after Couch resp.
      // If Couch response is 200 and passwords don't match, reply with error
      var hash = crypto.createHmac('sha256', credentials.salt)
                       .update(request.payload.password)
                       .digest('hex');

      if (!error && response.statusCode == 200 &&
          credentials.password !== hash) {
        message = 'Invalid username or password';
      return reply.view('login', {message: message, title: 'login page'});
      }
      // If Couch response is 200 and passwords match, authenticate
      else if (!error && response.statusCode == 200 &&
               credentials.password === hash) {
        // Cache session in redis, '0' ttl loads global configuration (use _rev
        // from CouchDB because it's convenient)
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
        return reply.view('login', {message: message, title: 'login page'});
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
      return reply.view('login', {message: message, title: 'login page'});
    }
    // Ask CouchDB for admin credential data
    else {
      fetchAndMatchCredentials(request, reply);
    }
  }

  if (request.method === 'get') {
    return reply.view('login', {title: 'login page'});
  }

};
