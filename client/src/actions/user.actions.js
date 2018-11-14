import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';

export const userActions = {
  login,
  logout,
  getAll,
};

/**
 * Login
 * @param {string} username - username or email
 * @param {string} password - user password
 * @returns {Function} - login function which returns Promise
 */
function login(username, password) {
  return dispatch => {
    // dispatch login request action
    dispatch(request({ username }));

    userService.login(username, password)
      .then(
        user => {
          // dispatch login success action
          dispatch(success(user));
        },
        error => {
          // dispatch login fail action and show alert
          dispatch(failure(error.response.data));
          dispatch(alertActions.error(error.response.data));
        },
      );
  };

  /**
   * Create login request action
   * @param {string} user - user name
   * @returns {{type: string, user: *}} - user request action
   */
  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }

  /**
   * Create login success action
   * @param {string} user - user name
   * @returns {{type: string, user: *}} - user logged in successfully action
   */
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }

  /**
   * Create login fail action
   * @param {string} error - error message
   * @returns {{type: string, error: *}} - login failed action
   */
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}


/**
 * Log out from app
 * @returns {{type: string}} - logout action
 */
function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

/**
 * Get all users
 * @returns {Function} - get all action function
 */
function getAll() {
  return dispatch => {
    dispatch(request());

    userService.getAll()
      .then(
        users => dispatch(success(users)),
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error.message));
        },
      );
  };


  /**
   * Create request action
   * @returns {{type: string}} - request processing action
   */
  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }

  /**
   * Create success action
   * @param {object[]} users - users list
   * @returns {{type: string, users: *}} - request success action
   */
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }

  /**
   * Create failure action
   * @param {object} error - error description
   * @returns {{type: string, error: *}} - request fail action
   */
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}
