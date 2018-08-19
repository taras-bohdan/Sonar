import { userConstants } from '../constants';

let userId = localStorage.getItem('userId');
const initialState = userId ? { loggedIn: true, userId } : { loggedIn: false };

/**
 * Authentication reducer
 * @param {object} state - authentication state
 * @param {object} action - authentication action
 * @return {*} - new state
 */
export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
