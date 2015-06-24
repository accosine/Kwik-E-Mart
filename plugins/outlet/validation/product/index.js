var Joi = require('joi');

module.exports.get = {
  params: {
    productID: Joi.string().min(3).max(40)
  }
};

module.exports.post = {
  params: {
    productID: Joi.string().min(3).max(40)
  },
  payload: Joi.object().keys({
        title: Joi.string(),
        price: Joi.string(),
        description: Joi.string(),
        categories: Joi.array(),
  })
};

module.exports.put = module.exports.post;

module.exports.delete = module.exports.get;
