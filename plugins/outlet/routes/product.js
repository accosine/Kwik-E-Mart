module.exports = [
  {
    method: 'GET',
    path: '/admin/products/{productID}',
    config: {
      handler: require('../handlers/product').get,
      validate: require('../validation/product').get,
      //auth: 'session'
    }
  },
  {
    method: 'POST',
    path: '/admin/products/{productID}',
    config: {
      handler: require('../handlers/product').post,
      validate: require('../validation/product').post,
      //auth: 'session'
    }
  },
  {
    method: 'DELETE',
    path: '/admin/products/{productID}',
    config: {
      handler: require('../handlers/product').delete,
      validate: require('../validation/product').delete,
      //auth: 'session'
    }
  },
  {
    method: 'PUT',
    path: '/admin/products/{productID}',
    config: {
      handler: require('../handlers/product').put,
      validate: require('../validation/product').put,
      //auth: 'session'
    }
  }
]
