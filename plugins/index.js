var options = require('../options').plugins;

var plugins = [
  {
    register: require('hapi-relax'),
    options: options.relax
  },
  {
    register: require('./hapi-justify'),
    options: options.justify
  },
  {
    register: require('./outlet')
  },
  {
    register: require('./mart-admin')
  }
];

if(process.env.NODE_ENV !== 'PRODUCTION') {
  plugins = plugins.concat([
    {
      register: require('tv'),
      options: {
        endpoint: '/debug/console',
        queryKey: 'debug'
      }
    }
  ]);
}

module.exports = function (server) {
  server.register(plugins, function (err) {
    if (err) {
      throw err; // something bad happened loading the plugin
    }
  });
};
