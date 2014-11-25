var Confidence = require('confidence');
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
  cache: {
    $filter: 'env',
    production: {
      engine: 'catbox-redis',
      host: process.env.REDISHOST !== null ? process.env.REDISHOST : void 0,
      port: process.env.REDISPORT !== null ? process.env.REDISPORT : void 0,
      password: process.env.REDISPWD !== null ? process.env.REDISPWD : void 0
    },
    $default: {
      engine: 'catbox-redis',
    }
  },
  database: {
    $filter: 'env',
    production: 'couch_production',
    staging: 'couch_staging',
    development: 'couch_development'
  }
});

criteria = {
  env: process.env.ENVIRONMENT
};

exports.get = function(key) {
  return store.get(key, criteria);
};
