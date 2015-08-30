var Joi = require('joi');

module.exports.get = {
  params: {
    productID: Joi.string().min(3).max(40)
  }
};
