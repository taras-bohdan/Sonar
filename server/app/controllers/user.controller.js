import { User } from '../models/user.model';
import { JWTService } from '../services/jwt.service';

const invalidUserMsg = 'Username or Password is not valid';

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
 * @param {Context} ctx - koa context
 * @returns {Object} user id and token
 */
export async function verifyUser(ctx) {
  const { username, password } = ctx.request.body;
  const user = await User.findOne().or([
    { username },
    { email: username },
  ]);

  if (!user) {
    ctx.throw(404, invalidUserMsg);
  }
  // test a matching password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error(invalidUserMsg);
  }
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
