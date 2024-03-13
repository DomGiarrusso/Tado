const Joi = require("joi");

// db schema
const tadoSchema = Joi.object({
  createAt: Joi.string(),
  task: Joi.string(),
  id: Joi.number(),
});

module.exports = { tadoSchema };
