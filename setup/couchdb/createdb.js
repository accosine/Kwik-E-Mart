var url = require('url');
var request = require('request');

var host = 'http://localhost:5984/';
var database = 'kwik-e-mart';

var username = 'apu';
var security = {admins: {names: [username], roles: []}, members: {names: [username], roles: []}};

request.put(url.resolve(host, database), function(err, response, body) {
  console.log(err ? err : 'Created ' + database + ' database!');
});

request.put({
  uri: url.resolve(host, database + '/_security'),
  body: JSON.stringify(security)
}, function(err, response, body) {
  console.log(err, body);
});
