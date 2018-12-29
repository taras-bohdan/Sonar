import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';

export const userActions = {
  getAll,
};

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
