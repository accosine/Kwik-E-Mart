#!/usr/bin/env node

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
    return callback(err);
  }

  if (headers && headers['set-cookie']) {
    nano = require('nano')({
      url: host,
      cookie: headers['set-cookie']
    });
  }

  nano.insert(

    //{ "views": {
    //"All Products": {
      //"map": "function(doc) {\n  if (doc.type === \"product\")\n    emit(doc._id, {'name':doc._id})\n}"
    //}
  //}
  //}

    { "views": 
      { "All Products": 
        { "map": function(doc) {
          if (doc.type === 'product') {
            emit(doc._id, doc);
          }
  } } 
  }
  }, '_design/allproducts', function (error, response) {
    console.log(error, response);
  });
});


