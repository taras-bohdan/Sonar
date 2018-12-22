import { GenericAuthService } from './generic-auth.service';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth/lib';
import { config } from '../../config/default';
import { User } from '../../models/user.model';
import { JWTService } from '../jwt.service';
import {logger} from '../logger.service';

/**
 * Google authentication
 */
export class GoogleAuthService extends GenericAuthService {

  /**
   * Creates google auth service instance
   */
  constructor() {
    super('google', { scope: ['https://www.googleapis.com/auth/plus.login'] });
  }

  /**
   * Create google auth strategy
   * @return {Strategy} - passport google authentication strategy
   */
  static createStrategy(){
    return new GoogleStrategy({
      clientID: config.auth.google.clientID,
      clientSecret: config.auth.google.clientSecret,
      callbackURL: '/auth/google/callback',
    }, async (accessToken, refreshToken, profile, done) => {
      const currentUser = await User.findOne({
        googleId: profile.id,
      });

      logger.debug('google strategy: got user');

      if (currentUser) {
        // create refresh token if not exists yet
        if (!currentUser.refreshToken) {
          currentUser.refreshToken = JWTService.generateRefreshToken();

          // save and return
          done(null, await currentUser.save());
          return;
        }

        done(null, currentUser);
      } else {
        logger.debug('google strategy: create new user');

        // create new user
        const newUser = await new User({
          username: profile.displayName,
          googleId: profile.id,
          refreshToken: JWTService.generateRefreshToken(),
        })
          .save();

        done(null, newUser);
      }
    })
  }
}
