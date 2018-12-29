import { authConstants, userConstants } from '../constants';
import { userService } from '../services';

/**
 * Login success action
 * @return {{type: string}} - action
 */
export function loginSuccess() {
  return { type: authConstants.LOGIN_SUCCESS };
}

/**
 * Log out from app
 * @returns {{type: string}} - logout action
 */
export function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}
