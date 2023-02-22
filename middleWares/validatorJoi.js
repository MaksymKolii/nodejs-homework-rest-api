const Joi = require("joi");

const validatorJoi = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const contactSchema = Joi.object({
  name: Joi.string()
      .pattern(/^\D+\s\D+$/)
      .trim()
      .messages({
        "string.pattern.base":
          "Must be First and Last name",
      }),
      
    email: Joi.string()
      .email()
      .trim()
      .messages({  "string.email": "Incorrect e-mail type " }),
  
    phone: Joi.string()
      .trim()
      .pattern(/^\W+\d{3}\W+\s\d+-*\d*$/)
      .messages({
        "string.pattern.base":
          "Incorrect phone number type -(xxx) xxx-xxx",
      }),
 
});

 module.exports = validatorJoi(contactSchema);