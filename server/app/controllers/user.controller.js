import { User } from '../models/user.model';
import { generateToken } from '../utils/jwt';

/**
 * Save user into DB
 */
export async function saveUser(newUser) {
  // create a user a new user
  const user = new User(newUser);
  await user.save();

  const token = generateToken(user);
  return {
    user: user,
    token: token,
  };
}

/**
 * Verify user for login
 * test: curl --http2 --insecure "https://localhost:5500/login?userName=xdr&password=123qweasd"
 */
export async function verifyUser(userToVerify) {
  const user = await User.findOne().or([
    { username: userToVerify.userName },
    { email: userToVerify.email },
  ]);

  // test a matching password
  const isMatch = await user.comparePassword(userToVerify.password);
  if (!isMatch) {
    throw new Error('Username or Password is Wrong');
  }
  const token = generateToken(user);
  return {
    user: user,
    token: token,
  };
}
