import mongoose from 'mongoose';
import { userSchema } from './user.model';

/**
 * ----- Device -----
 */

const deviceSchema = mongoose.Schema({
  type: String,
  manufacturer: String,
});

/**
 * ----- Connection -----
 */

const accessPointSchema = mongoose.Schema({
  name: String,
  placement: {
    lat: Number,
    lon: Number,
  },
  group: String,
});

const signalSchema = mongoose.Schema({
  point: accessPointSchema,
  signalStrength: Number,
});

const connectionSchema = mongoose.Schema({
  signals: [signalSchema],
  mac: String,
});


/**
 * ----- User location -----
 */

const userLocationSchema = mongoose.Schema({
  user: userSchema,
  connection: connectionSchema,
  device: deviceSchema,
  date: Date,
});

const UserLocation = mongoose.model('UserLocation', userLocationSchema);

export default UserLocation;