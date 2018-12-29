import axios from 'axios';
import { TokenService } from './token.service';

// enforce singleton usage with this symbol variables
const singleton = Symbol('httpServiceSingleton');
const singletonEnforcer = Symbol('httpServiceSingletonEnforcer');

/**
 * A service to deal with http calls
 */
class HttpService {
  /**
   * Create service instance
   * @param {Symbol} enforcer - singleton enforcer
   * @return {AxiosInstance} - axios instance
   */
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    this.axios = axios.create();

    this.setAuthHeader();
    this.createResponseInterceptor();

    return this.axios;
  }

  /**
   * get service instance
   * @return {AxiosInstance} - service instance
   */
  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new HttpService(singletonEnforcer);
    }

    return this[singleton];
  }

  /**
   * Add token to auth header
   * @return {void}
   */
  setAuthHeader() {
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${TokenService.accessToken}`;
  }

  /**
   * Create response interceptor
   * @return {void}
   */
  createResponseInterceptor() {
    this.axiosResponseInterceptor = this.axios.interceptors.response.use(
      response => response,
      error => {
        let errorResponse = error.response;

        if (errorResponse.status === 401) {
          // eject current interceptor to pass error from refresh token endpoint
          this.axios.interceptors.response.eject(this.axiosResponseInterceptor);

          return this.axios.post('/api/refresh_token', {
            'refresh_token': TokenService.refreshToken,
          }).then(response => {
            // set new access token
            const { access_token } = response.data;
            TokenService.accessToken = access_token;

            errorResponse.config.headers['Authorization'] = 'Bearer ' + access_token;

            // create interceptor again and retry previous request with new token
            this.createResponseInterceptor();
            return this.axios(errorResponse.config);
          }).catch(error => {
            // remove tokens from local storage
            TokenService.destroyTokens();

            this.createResponseInterceptor();
            this.router.push('/login');
            return Promise.reject(error);
          });
        }

        return Promise.reject(error);
      },
    );
  }
}

export const httpService = HttpService.instance;
