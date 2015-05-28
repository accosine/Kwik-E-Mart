var url = require('url');
var request = require('request');

module.exports = function(host, db, username, cb) {
  var security = {admins: {names: [username], roles: []}, members: {names: [username], roles: []}};
  request.put(url.resolve(host, db), function(err, response, body) {
    if (err) {
      throw err;
    }
    request.put({
      uri: url.resolve(host, db + '/_security'),
      body: JSON.stringify(security)
    }, function(err, response, body) {
      cb(err, response, body);
    });
  });
};
