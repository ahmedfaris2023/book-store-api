const mongoose = require("mongoose");
const Joi = require("joi");
const AuthorSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    image: {
      type: String,
      default: "default-avatar.png",
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", AuthorSchema);

function validatedCreateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200).required(),
    lastName: Joi.string().trim().min(3).max(200).required(),
    nationality: Joi.string().trim().min(1).max(100).required(),
    img: Joi.string(),
  });
  return schema.validate(obj);
}

function validatedUpdateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200),
    lastName: Joi.string().trim().min(3).max(200),
    nationality: Joi.string().trim().min(2).max(100),
    img: Joi.string(),
  });
  return schema.validate(obj);
}

module.exports = {
  Author,
  validatedCreateAuthor,
  validatedUpdateAuthor,
};
