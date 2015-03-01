var path = require('path')
  , crypto = require('crypto');

module.exports = function (request, reply) {
  var that = this
  , message = ''
  , cookies;

  function fetchAndMatchCredentials(request, reply) {
    request.server.methods.couch.get(that.adminprefix + request.payload.username,
        function(err, credentials) {
      // If username does not exist
      if (err && err.reason === 'missing') {
        console.log(err);
        message = 'Invalid username or password';
      }
        // Something is rotten in the state of Denmark
      else if (err) {
        console.log(err);
      }
      else {
        // If couch responds with the credentials
        var hash = crypto.createHmac('sha256', credentials.salt)
                         .update(request.payload.password)
                         .digest('hex');

        // If the hashed password does not match the hash in couch
        if (credentials.password !== hash) {
          message = 'Invalid username or password';
        }
        // If the passwords match, authenticate
        else if (credentials.password === hash) {
          request.auth.session.set({ sid: credentials._rev });
          return reply.redirect(that.redirectOnSuccess);
        }
      }
      return reply.view('login', {message: message, title: 'login page'});
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
