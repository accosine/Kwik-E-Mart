#!/usr/bin/env node

if (process.argv.length < 5) {
  throw new Error('I find your lack of arguments disturbing!');
}

var host = process.argv[2]
  , rootUsername = process.argv[3]
  , rootPassword = process.argv[4]
  , nano = require('nano')(host)
;

nano.auth(rootUsername, rootPassword, function (err, body, headers) {
  if (err) {
    throw err;
  }

  if (headers && headers['set-cookie']) {
    nano = require('nano')({
      url: host,
      cookie: headers['set-cookie']
    });
  }

  var username = 'apu';
  var password = 'manjula';

  nano.insert({
    '_id': 'org.couchdb.user:' + username,
    'name': username,
    'roles': [],
    'type': 'user',
    'password': password
  }, function(err, body, headers) {
    if (err) {
      throw err;
    }
  });
});


