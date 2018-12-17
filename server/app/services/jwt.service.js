import jwt from 'jsonwebtoken';
import randomToken from 'random-token';


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
      expiresIn: 300, // expires in 5 minutes
    });
  }

  /**
   * Generate refresh token
   * @return {string} refresh token
   */
  static generateRefreshToken() {
    // generate refresh token with 32 symbols length
    return randomToken(32);
  }
}
