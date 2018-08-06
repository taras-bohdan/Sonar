import { userConstants } from '../constants/user.constants';

/**
 * Users reducer
 * @param {object} state - current users state
 * @param {object} action - action to be performed
 * @returns {*} - new modified state
 */
export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users,
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
