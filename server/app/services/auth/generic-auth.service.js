import passport from 'koa-passport';

/**
 * Generic authentication service.
 * Abstract, do not use alone, only extend
 */
export class GenericAuthService {
  /**
   * Service constructor
   * @param {string} strategy - authentication strategy
   * @param {*} options - authentication options
   */
  constructor(strategy, options = null) {
    this.strategy = strategy;
    this.options = options;
  }

  /**
   * Authenticate
   * @return {passport} - passport authentication function
   */
  authenticate() {
    return passport.authenticate(this.strategy, this.options);
  }

  /**
   * Auth callback
   * @return {passport} - passport authentication function
   */
  callback() {
    return passport.authenticate(this.strategy, { successRedirect: '/', failureRedirect: '/login' });
  }
}
