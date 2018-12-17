import { User } from '../models/user.model';
import { GoogleAuthService } from './auth/google-auth.service';
import { LocalAuthService } from './auth/local-auth.service';

const passport = require('koa-passport');


/**
 * Authentication service
 */
export class PassportService {
  /**
   * init passport middleware
   * @param {module.Application|*|Application} app - Koa application
   * @returns {void}
   */
  static initPassport(app) {
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      return User.findById(id)
        .then(user => {
          done(null, user);
        }).catch(err => {
          done(err, null);
        });
    });

    // create strategies
    passport.use(LocalAuthService.createStrategy());
    passport.use(GoogleAuthService.createStrategy());

    app.use(passport.initialize());
    app.use(passport.session());
  }
}
