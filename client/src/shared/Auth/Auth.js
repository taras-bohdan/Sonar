import axios from 'axios/index';

export class Auth {
  isAuthenticated = false;
  token = null;
  userId = null;

  login(email, password) {
    return axios.post('/user/signIn', {
      email,
      password,
    }).then(({ token, userId }) => {
      this.isAuthenticated = true;
      this.token = token;
      this.userId = userId;
    });
  }
}
