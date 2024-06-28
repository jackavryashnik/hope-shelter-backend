import { Schema, model } from 'mongoose';
import Joi from 'joi';
import handleSchemaValidationErrors from '../helpers/handleSchemaValidationErrors.js';

const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: {
      type: String,
      require: true,
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSchemaValidationErrors);

export const registrationSchema = Joi.object({
  userName: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const UserModel = model('user', userSchema);

export default userSchema;
