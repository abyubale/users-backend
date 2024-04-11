import mongoose, { Schema } from 'mongoose';
import { EMAIL_REGEX } from '../constant.js';

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      require: true,
      lowercase: true,
      trim: true,
      minLength: 3,
    },
    last_name: {
      type: String,
      require: true,
      lowercase: true,
      trim: true,
      minLength: 3,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      match: EMAIL_REGEX,
    },
    phone: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
