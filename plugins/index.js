var options = require('../options').plugins;

var plugins = [
  {
    register: require('hapi-auth-cookie')
  },
  {
    register: require('./hapi-justify'),
    options: options.justify
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
