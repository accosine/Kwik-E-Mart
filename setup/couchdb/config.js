var request = require('request');

var host = 'http://localhost:5984/_config/httpd/authentication_handlers';
//var handlers = '"{couch_httpd_auth, cookie_authentication_handler}"';
var handlers = '"{couch_httpd_auth, cookie_authentication_handler}, {couch_httpd_auth, default_authentication_handler}"';

request.put({
  uri: host,
  body: handlers
}, function(err, response, body) {
  console.log(err, body);
});
