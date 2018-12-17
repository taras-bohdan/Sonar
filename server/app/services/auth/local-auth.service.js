import { GenericAuthService } from './generic-auth.service';
import { User } from '../../models/user.model';

const LocalStrategy = require('passport-local').Strategy;

const invalidUserMsg = 'Username or Password is not valid';

export class LocalAuthService extends GenericAuthService {
  /**
   * Creates google auth service instance
   */
  constructor() {
    super('local', {
      failureFlash: true
    });
  }

  static createStrategy(options = {}) {
    return new LocalStrategy(options, async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: invalidUserMsg });
        }

        if (await user.comparePassword(password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: invalidUserMsg });
        }
      } catch (err) {
        return done(err);
      }
    });
  }
}
