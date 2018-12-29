import { authConstants } from '../constants';
import { TokenService } from '../services/token.service';

/**
 * Authentication initial state
 * @type {{loggedIn: boolean}}
 */
const initialState = { loggedIn: !!TokenService.refreshToken };

/**
 * Authentication reducer
 * @param {object} state - authentication state
 * @param {object} action - authentication action
 * @return {*} - new state
 */
export function authentication(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
      };
    case authConstants.LOGIN_FAILURE:
      return {};
    case authConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
