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
  defaultExtension: "html",
  //path: '',
  partialsPath: 'partials',
  helpersPath: __dirname + '/templates/helpers',
  relativeTo: __dirname + '/templates/',
  layout: true,
  layoutPath: 'layouts',
  layoutKeyword: 'content',
  encoding: 'utf8',
  isCached: process.env.NODE_ENV === 'PRODUCTION' ? true : false,
  allowAbsolutePaths: false,
  allowInsecureAccess: false,
  compileOptions: {},
  runtimeOptions: {},
  contentType: 'text/html',
  compileMode: 'sync',
  context: {}
};

