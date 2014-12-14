var config = require('./config');

module.exports.server = {
  debug: config.get('/debug'),
  cache: config.get('/cache')
};

module.exports.connection = {
  port: config.get('/server/port')
};

module.exports.plugins = {
  justify: config.get('/plugins/justify')
};

module.exports.views = {
  engines: {
    html: require('handlebars')
  },
  path: __dirname + '/templates',
  isCached: process.env.NODE_ENV === 'PRODUCTION' ? true : false
};
