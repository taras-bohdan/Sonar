import { User } from '../models/user.model';

/**
 * Get all users
 * @returns {Promise<*>} - list of users
 */
export async function getAllUsers() {
  return await User.find({}, {
    email: 1,
    firstName: 1,
    lastName: 1,
    username: 1,
    _id: 1,
  });
}
