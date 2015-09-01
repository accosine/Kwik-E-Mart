module.exports = [
  {
    method: 'GET',
    path: '/inlet/allprod',
    config: {
      handler: require('../handlers/allprod').get,
      //validate: require('../validation/product').get,
      //auth: 'session'
    }
  },
  {
    method: 'GET',
    path: '/inlet/newprod',
    config: {
      handler: require('../handlers/newprod').get,
      //validate: require('../validation/product').get,
      //auth: 'session'
    }
  },
  {
    method: 'GET',
    path: '/inlet/highprod',
    config: {
      handler: require('../handlers/highprod').get,
      //validate: require('../validation/product').get,
      //auth: 'session'
    }
  },
  {
    method: 'GET',
    path: '/inlet/cateprod',
    config: {
      handler: require('../handlers/cateprod').get,
      //validate: require('../validation/product').get,
      //auth: 'session'
    }
  }
]
