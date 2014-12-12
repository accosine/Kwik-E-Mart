exports.register = function (server, options, next) {

  server.dependency('hapi-auth-cookie', function (server, next) {
    var cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
    server.app.cache = cache;

    server.auth.strategy('session', 'cookie', {
      password: 'secret',
      cookie: 'sid-example',
      redirectTo: '/login',
      isSecure: false,
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

    server.route([
      {
        method: 'GET',
        path: '/',
        config: {
          handler: require('./home'),
          auth: 'session'
        }
      },
      {
        method: ['GET', 'POST'],
        path: '/login',
        config: {
          handler: require('./login'),
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
          auth: 'session'
        }
      }
    ]);

    return next();
  });

  return next();
};


exports.register.attributes = {
  pkg: require('./package.json')
};

