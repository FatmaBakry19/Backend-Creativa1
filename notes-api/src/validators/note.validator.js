const Joi = require("joi");

const createNoteSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100).required(),

  content: Joi.string().trim().max(5000).required(),
});

const updateNoteSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100),

  content: Joi.string().trim().max(5000),
})
  .min(1)
  .required();

module.exports = {
  createNoteSchema,
  updateNoteSchema,
};