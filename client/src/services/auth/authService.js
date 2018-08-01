import { httpService } from '../httpService';

export class authService {
  isAuthenticated = false;
  token = null;
  userId = null;

  login(username, password) {
    return httpService.post('/user/signIn', {
      username,
      password,
    }).then(res => {
      const { token, userId } = res.data;
      this.isAuthenticated = true;
      this.token = token;
      this.userId = userId;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userId', userId);
    });
  }
}
