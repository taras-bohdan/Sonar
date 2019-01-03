import { User } from '../models/user.model';

/**
 * Get all users
 * @returns {Promise<*>} - list of users
 */
export async function getAllUsers() {
  return await User.find({}, {
    refreshToken: 0,
    __v: 0
  });
}
