import { User } from '../models/user.model';
import loggerService from './logger.service';


const passport = require('koa-passport');

const LocalStrategy = require('passport-local').Strategy;

const invalidUserMsg = 'Username or Password is not valid';


/**
 * Authentication service
 */
export class AuthenticationService {
  /**
   * init passport middleware
   * @param {module.Application|*|Application} app - Koa application
   * @returns {void}
   */
  static initPassport(app) {
    loggerService.info('init passport');

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((_id, done) => {
      return User.findOne({ _id })
        .then(user => {
          done(null, user);
        }).catch(err => {
          done(err, null);
        });
    });

    const options = {};
    passport.use(new LocalStrategy(options, async (username, password, done) => {
      loggerService.info('verification function called');
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false);
        }

        if (await user.comparePassword(password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: invalidUserMsg });
        }
      } catch (err) {
        return done(err);
      }
    }));


    app.use(passport.initialize());
    app.use(passport.session());
  }
}
