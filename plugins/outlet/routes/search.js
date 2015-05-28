module.exports = [
  {
    method: 'GET',
    path: '/admin/search',
    config: {
      handler: require('../handlers/search').get,
      validate: require('../validation/search').get,
      //auth: 'session'
    }
  }
]
