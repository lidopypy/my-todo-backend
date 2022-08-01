const Joi = require("joi"); //Verify schema data correction.

module.exports = {
  registerValidation(data) {
    const schema = Joi.object({
      username: Joi.string().min(3).max(50).required(),
      email: Joi.string().min(6).max(50).required().email(),
      password: Joi.string().min(6).max(255).required(),
    });
    return schema.validate(data);
  },

  loginValidation(data) {
    const schema = Joi.object({
      email: Joi.string().min(6).max(50).required().email(),
      password: Joi.string().min(6).max(255).required(),
    });
    return schema.validate(data);
  },

  // response Client
  responseClient(
    res,
    httpCode = 500,
    code = 3,
    message = "error!!",
    data = {}
  ) {
    let responseData = {};
    responseData.code = code;
    responseData.message = message;
    responseData.data = data;
    res.status(httpCode).json(responseData);
  },
};
