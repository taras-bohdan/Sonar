import { httpService } from './httpService';

export const userService = {
  login,
  logout,
};

function login(username, password) {
  return httpService.post('/user/signIn', {
    username,
    password,
  }).then(({ data }) => {
    const { token, userId } = data;

    localStorage.setItem('user', token);
    localStorage.setItem('userId', userId);

    return data;
  });
}

function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('userId');
}
