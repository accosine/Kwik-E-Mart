exports.register = function (server, options, next) {

  var users = {
    john: {
      id: 'john',
      password: 'password',
      name: 'John Doe'
    }
  };

  server.dependency('hapi-auth-cookie', function (server, next) {
    server.auth.strategy('session', 'cookie', {
      password: 'secret',
      cookie: 'sid-example',
      redirectTo: '/login',
      isSecure: false
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

