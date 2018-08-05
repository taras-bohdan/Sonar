import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';

export const userActions = {
  login,
  logout,
};

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

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }

  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }

  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}
