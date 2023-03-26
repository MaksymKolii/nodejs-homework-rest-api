const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const Joi = require("joi");
const bcryptjs = require("bcryptjs");

const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      // unique: true,
      trim: true,
      lowercase: true,
      match: [emailRegExp, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      // default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (pwd) {
  this.password = bcryptjs.hashSync(pwd, bcryptjs.genSaltSync(10));
};

userSchema.methods.comparePassword = function (pwd) {
  return bcryptjs.compareSync(pwd, this.password);
};

userSchema.post("save", handleSaveErrors);

const joiSingUpSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    "string.pattern.base": `Please fill a valid email address`,
  }),
  password: Joi.string().min(6).required(),
});

const joiSingInSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    "string.pattern.base": `Please fill a valid email address`,
  }),
  password: Joi.string().min(6).required(),
});

const joiVerifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    "string.pattern.base": `Please fill a valid email address`,
  }),
  password: Joi.string().min(6).required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const joiUserSchemas = {
  joiSingUpSchema,
  joiSingInSchema,
  joiSubscriptionSchema,
  joiVerifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = { User, joiUserSchemas };
