var url = require('url');

module.exports = function(host, username, password, cb) {
  var nano = require('nano')(url.resolve(host, '_users'));
  nano.insert({
    '_id': 'org.couchdb.user:' + username,
    'name': username,
    'roles': [],
    'type': 'user',
    'password': password
  }, cb);
};
