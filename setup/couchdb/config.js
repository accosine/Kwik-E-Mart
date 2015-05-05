var url = require('url');
var request = require('request');

var configPath = '_config/httpd/authentication_handlers';
var handlers = '"{couch_httpd_auth, cookie_authentication_handler}, {couch_httpd_oauth, oauth_authentication_handler}, {couch_httpd_auth, default_authentication_handler}"';

module.exports = function(host, cb) {
  request.put({
    uri: url.resolve(host, configPath),
    body: handlers
  }, function(err, response, body) {
    cb(err, response, body);
  });
};
