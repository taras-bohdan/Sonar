import { User } from '../models/user.model';
import { JWTService } from '../services/jwt.service';

/**
 * Save user into DB
 * @param {Object} newUser - user
 * @returns {Object} user info and token
 */
export async function saveUser(newUser) {
  // create a user a new user
  const user = new User(newUser);
  await user.save();

  const token = JWTService.generateToken(user);
  return {
    user: user,
    token: token,
  };
}

/**
 * Verify user for login
 * test: curl --http2 --insecure "https://localhost:5500/login?userName=xdr&password=123qweasd"
 * @param {model} user - user model
 * @returns {Object} user id and token
 */
export async function getUserInfo(user) {
  const token = JWTService.generateToken(user);
  return {
    userId: user._id,
    token: token,
  };
}

/**
 * Get all users
 * @returns {Promise<*>} - list of users
 */
export async function getAllUsers() {
  return await User.find({}, {
    email: 1,
    firstName: 1,
    lastName: 1,
    _id: 1,
  });
}
