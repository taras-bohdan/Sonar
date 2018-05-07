import mongoose from 'mongoose';

/**
 * ----- User -----
 */

export const userSchema = mongoose.Schema({
  id: Number,
  name: String,
  birthday: Date,
  location: String,
  photo: String,
});

export const User = mongoose.model('User', userSchema);