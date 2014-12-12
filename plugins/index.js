var plugins = [
  {
    register: require('hapi-auth-cookie')
  },
  {
    register: require('./hapi-justify')
  }
];

module.exports = function (server) {
  server.register(plugins, function (err) {
    if (err) {
      throw err; // something bad happened loading the plugin
    }
  });
};
