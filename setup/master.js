var prompt = require('prompt');

var config = require('./couchdb/config');
var createdb = require('./couchdb/createdb');
var sethapiuser = require('./couchdb/sethapiuser');
var createproducts = require('./couchdb/createproducts');
var createviews = require('./couchdb/createviews');
var createuser = require('./couchdb/createuser');
var partycrasher = require('./couchdb/partycrasher');

var schema = {
  properties: {
    host: {
      description: 'Enter the CouchDB URI'.yellow,
      type: 'string',
      default: 'http://localhost:5984/',
      required: true
    },
    db: {
      description: 'Enter name for the Kwik-E-Mart DB'.yellow,
      type: 'string',
      default: 'kwik-e-mart',
      required: true
    },
    adminuser: {
      description: 'Enter username for admin user'.yellow,
      type: 'string',
      default: 'root',
      required: true
    },
    adminpassword: {
      description: 'Enter password for admin user'.yellow,
      type: 'string',
      default: 'asdf',
      required: true,
      hidden: true
    },
    dbuser: {
      description: 'Enter username for database user'.yellow,
      type: 'string',
      default: 'apu',
      required: true
    },
    dbpassword: {
      description: 'Enter password for database user'.yellow,
      type: 'string',
      default: 'manjula',
      required: true,
      hidden: true
    },
    prefix: {
      description: 'Enter prefix for products database key'.yellow,
      type: 'string',
      default: 'product-',
      required: true
    },
    hapiuser: {
      description: 'Enter username for hapi backend user'.yellow,
      type: 'string',
      default: 'root',
      required: true
    },
    hapipassword: {
      description: 'Enter password for hapi backend user'.yellow,
      type: 'string',
      default: 'asdf',
      required: true,
      hidden: true
    }
  }
};

prompt.message = 'Kwik-E-Mart - The Grand Opening'.magenta;
prompt.start();

// entering callback hell
prompt.get(schema, function (err, result) {
  config(result.host, function(err, response, body) {
    if (err) {throw err;}
    createdb(result.host, result.db, result.dbuser, function(err, response, body) {
      if (err) {throw err;}
      sethapiuser(result.host, result.db, result.hapiuser, result.hapipassword,
          function(err, response, body) {
        if (err) {throw err;}
        createproducts(result.host, result.db, result.prefix, function(err, response, body) {
          if (err) {throw err;}
          createviews(result.host, result.db, function(err, response, body) {
            if (err) {throw err;}
            createuser(result.host, result.dbuser, result.dbpassword,
                function(err, response, body) {
              if (err) {throw err;}
              partycrasher(result.host, result.adminuser, result.adminpassword,
                  function(err, response, body) {
                if (err) {throw err;}
              });
            });
          });
        });
      });
    });
  });
});
