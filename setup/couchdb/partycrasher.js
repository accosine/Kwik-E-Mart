var request = require('request');

var host = 'http://localhost:5984/_config/admins/';
var username = 'root';
var password = '"asdf"';

request.put({
  uri: host + username,
  body: password
}, function(err, response, body) {
  console.log(err, body);
});
