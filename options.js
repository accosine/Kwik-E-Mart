var config = require('./config');

var server = {
  debug: config.get('/debug'),
  cache: config.get('/cache')
};

var connection = {
  port: config.get('/server/port')
};

var views = {
  engines: {
    html: require('handlebars')
  },
  path: __dirname + '/templates',
  isCached: process.env.NODE_ENV === 'PRODUCTION' ? true : false
};

module.exports.server = server;
module.exports.connection = connection;
module.exports.views = views;

