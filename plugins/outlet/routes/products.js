module.exports = [
  {
    method: 'GET',
    path: '/admin/products/',
    config: {
      handler: require('../handlers/products').get,
      validate: require('../validation/products').get,
      //auth: 'session'
    }
  }
]
