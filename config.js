var Confidence = require('confidence')
  , path = require('path');

var criteria, store;

store = new Confidence.Store({
  server: {
    $filter: 'env',
    production: {
      port: process.env.PORT
    },
    $default: {
      port: 8080
    }
  },
  debug: {
    $filter: 'env',
    production: {
      request: ['error']
    },
    $default: {
      request: ['error'],
      log: ['error']
    }
  },
  cache: {
    $filter: 'env',
    production: {
      engine: require('catbox-redis'),
      host: process.env.REDISHOST !== null ? process.env.REDISHOST : void 0,
      port: process.env.REDISPORT !== null ? process.env.REDISPORT : void 0,
      password: process.env.REDISPWD !== null ? process.env.REDISPWD : void 0,
      partition: 'Kwik-E-Mart'
      // name: 'seperate cache name'
    },
    $default: {
      engine: require('catbox-redis'),
      partition: 'Kwik-E-Mart'
    }
  },
  database: {
    host: '127.0.0.1:5984',
    database: 'kwik-e-mart',
    adminprefix: 'admin-'
  },
  plugins: {
    $filter: 'env',
    production: {},
    $default: {
      justify: {
        adminprefix: 'admin-',
        auth: {
          password: 'secret',
          cookie: 'sid-example',
          redirectTo: '/login',
          isSecure: false
        },
        cacheExpiration: 3 * 24 * 60 * 60 * 1000,
        cacheSegment: 'sessions',
        redirectOnSuccess: '/admin'
      },
      relax: {
        nano : {
          db: 'kwik-e-mart'
        },
        user: 'root',
        password: 'asdf',
        prefix: 'couch'
      }
    }
  }
});

criteria = {
  env: process.env.ENVIRONMENT
};

exports.get = function(key) {
  return store.get(key, criteria);
};

