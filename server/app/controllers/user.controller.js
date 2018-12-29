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

  // generate refresh token
  const refreshToken = JWTService.generateRefreshToken();

  // set users refresh token
  user.refreshToken = refreshToken;

  // save user into DB
  await user.save();

  const token = JWTService.generateToken(user);

  return {
    user,
    token,
    refreshToken,
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
