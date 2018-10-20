import jwt from 'jsonwebtoken';
import * as User from 'mongoose/lib/model';

/**
 * JSON web token service
 */
export class JWTService {
  /**
   * Generate user token
   * @param {object} user - user info
   * @return {*} - token
   */
  static generateToken(user) {
    const u = {
      username: user.username,
      _id: user._id.toString(),
    };
    return jwt.sign(u, process.env.JWT_SECRET, {
      expiresIn: 60 * 60, // expires in 1 hour
    });
  }


  /**
   * Verify token
   * @param {string} token - user token
   * @return {Promise<{user, token: *}>} - user info and token
   */
  static async verifyUserToken(token) {
    const u = jwt.verify(token, process.env.JWT_SECRET);
    //return user using the id from w/in JWTToken
    const user = await User.findById({
      '_id': u._id,
    });

    const newToken = this.generateToken(user);
    return {
      user,
      token: newToken,
    };
  }
}
