import { GenericAuthService } from './generic-auth.service';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth/lib';
import { config } from '../../config/default';
import loggerService from '../logger.service';
import { User } from '../../models/user.model';
import { JWTService } from '../jwt.service';

/**
 * Google authentication
 */
export class GoogleAuthService extends GenericAuthService {

  /**
   * Creates google auth service instance
   */
  constructor() {
    super('google', { scope: ['profile'] });
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
      loggerService.info('google strategy callback fired');

      const currentUser = await User.findOne({
        googleId: profile.id,
      });

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
