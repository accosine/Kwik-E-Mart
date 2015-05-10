#!/usr/bin/env node

var products = require('./products').products;

if (process.argv.length < 5) {
  throw new Error('I find your lack of arguments disturbing!');
}

var host = process.argv[2]
  , username = process.argv[3]
  , userpass =  process.argv[4]
  , nano     = require('nano')(host)
;

nano.auth(username, userpass, function (err, body, headers) {
  if (err) {
    throw err;
  }

  if (headers && headers['set-cookie']) {
    nano = require('nano')({
      url: host,
      cookie: headers['set-cookie']
    });
  }

  products.forEach(function(product) {
    product._id = 'product-' + product._id;
    nano.insert(product, function(err, body, headers) {
      if (err) {
        throw err;
      }
    });
  });
});


