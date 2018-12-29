import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import {logger} from '../services/logger.service';

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  username: String,
  firstName: String,
  lastName: String,
  password: String,
  googleId: Number,
  refreshToken: String,
});

UserSchema.pre('save', hashPasswordOnChange);

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


/**
 * Hash password before saving on change
 * @param {function} next - next function to call
 * @returns {Promise<void>} nothing
 */
async function hashPasswordOnChange(next) {
  const saltWorkFactor = 10;
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
    // generate a salt
    const salt = await bcrypt.genSalt(saltWorkFactor);

    // override the cleartext password with the hashed one
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    logger.error(err);
  }
}

export const User = mongoose.model('User', UserSchema);
