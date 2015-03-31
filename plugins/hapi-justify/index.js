var hoek = require('hoek');

exports.register = function (server, options, next) {
  server.dependency('hapi-relax', function (server, next) {
    server.register(require('hapi-auth-cookie'), function (err) {

      var cache = server.cache({ segment: options.cacheSegment, expiresIn: options.cacheExpiration });
      server.app.cache = cache;
      hoek.merge(options.auth, {
        validateFunc: function (session, callback) {
          cache.get(session.sid, function (err, cached) {
            if (err) {
              return callback(err, false);
            }
            if (!cached) {
              return callback(null, false);
            }
            return callback(null, true, cached.account);
          });
        }
      });
      server.auth.strategy('session', 'cookie', options.auth);

      server.route([
        {
          method: 'POST',
          path: '/login',
          config: {
            handler: require('./login'),
            payload: {
              maxBytes: 1024
            },
            bind: options,
            auth: {
              mode: 'try',
              strategy: 'session'
            },
            plugins: {
              'hapi-auth-cookie': {
                redirectTo: false
              }
            }
          }
        },
        {
          method: 'GET',
          path: '/login',
          config: {
            handler: require('./login'),
            bind: options,
            auth: {
              mode: 'try',
              strategy: 'session'
            },
            plugins: {
              'hapi-auth-cookie': {
                redirectTo: false
              }
            }
          }
        },
        {
          method: 'GET',
          path: '/logout',
          config: {
            handler: require('./logout'),
            bind: options,
            auth: 'session'
          }
        }
      ]);

      return next();
    });
  });

  return next();
};


exports.register.attributes = {
  pkg: require('./package.json')
};

