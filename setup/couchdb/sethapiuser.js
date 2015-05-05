var crypto = require('crypto');
var url = require('url');

module.exports = function(host, db, username, password, cb) {
  var salt = crypto.randomBytes(64).toString('base64');
  var hash = crypto.createHmac('sha256', salt).update(password).digest('hex');
  var nano = require('nano')(url.resolve(host, db));

  nano.insert({
    _id: 'admin-' + username,
    password: hash,
    salt: salt,
    role: 'admin'
  }, cb);
};
