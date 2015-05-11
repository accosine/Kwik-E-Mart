var url = require('url');
var request = require('request');

module.exports = function(host, username, password, cb) {
  request.put({
    uri: url.resolve(host, '_config/admins/' + username),
    body: '"' + password + '"'
  }, function(err, response, body) {
    cb(err, response, body);
  });
};
