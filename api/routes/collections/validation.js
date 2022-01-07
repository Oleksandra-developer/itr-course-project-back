const Joi = require("joi");
const mongoose = require("mongoose");

const schemaCollection = Joi.object({
  title: Joi.string().min(3).max(15).required(),
  description: Joi.string().required(),
  coll_theme: Joi.string().required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: 400,
      message: err.message.replace(/"/g, " Validation Joi error"),
    });
  }
};

module.exports = {
  validationCollection: (req, res, next) => {
    return validate(schemaCollection, req.body, next);
  },

  validateMongoId: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({
        status: 400,
        message: "Invalid ObjectId",
      });
    }
    next();
  },
};