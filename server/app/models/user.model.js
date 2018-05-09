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

// TODO might be used in future
// export const User = mongoose.model('User', userSchema);

