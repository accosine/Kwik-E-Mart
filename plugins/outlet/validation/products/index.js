var Joi = require('joi');

module.exports.get = {
  query: {
    from: Joi.number().min(0).max(20),
    quantity: Joi.number().min(0).max(20),
    category: Joi.string().min(0).max(20)
  }
};
