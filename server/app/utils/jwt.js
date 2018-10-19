import jwt from 'jsonwebtoken';
import * as User from 'mongoose/lib/model';

/**
 * Generate user token
 * @param {object} user - user info
 * @return {*} - token
 */
export function generateToken(user) {
  const u = {
    username: user.username,
    _id: user._id.toString(),
  };
  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60, // expires in 1 hour
  });
}


export async function verifyUserToken(token) {
  const u = jwt.verify(token, process.env.JWT_SECRET);
  //return user using the id from w/in JWTToken
  const user = await User.findById({
    '_id': u._id,
  });

  const newToken = generateToken(user);
  return {
    user,
    token: newToken,
  };
}
