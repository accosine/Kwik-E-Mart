var Joi = require('joi');

module.exports.get = {
  query: {
    type: Joi.string().min(3).max(20).required(),
    q: Joi.string().min(3).required()
  }
};
