import { httpService } from './http.service';
import { tokenType } from '../constants/auth.constants';

export const userService = {
  login,
  logout,
  getAll,
};

/**
 * Send login request to server
 * @param {string} username - user id or email
 * @param {string} password - user password
 * @returns {*} - user id and token
 */
function login(username, password) {
  return httpService.post('/auth/basic/login', {
    username,
    password,
  }).then(({ data }) => {
    const { token, userId } = data;

    localStorage.setItem(tokenType.ACCESS, token);
    localStorage.setItem('userId', userId);

    return data;
  });
}

/**
 * Remove user info from local storage to logout
 * @returns {undefined}
 */
function logout() {
  localStorage.removeItem(tokenType.ACCESS);
  localStorage.removeItem('userId');
}

/**
 * Send request to server to get all users
 * @returns {*} - promise
 */
function getAll() {
  return httpService.get('/api/v1/user/getAll');
}
