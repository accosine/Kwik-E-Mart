var Joi = require('joi');

module.exports.get = {
  params: {
    productID: Joi.string().min(3).max(20)
  }
};

module.exports.post = {
  params: {
    productID: Joi.string().min(3).max(20)
  },
  payload: Joi.object().keys({
        name: Joi.string(),
        price: Joi.string(),
        lagen: Joi.string().required(),
        description: Joi.string()
  })
};

module.exports.put = module.exports.post;

module.exports.delete = module.exports.get;
