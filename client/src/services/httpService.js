import axios from 'axios/index';
import { authHeader } from '../helpers';

/**
 * A service to deal with http calls
 */
export class httpService {
  /**
   * Send GET request
   * @param {string} url - request url
   * @returns {AxiosPromise<any>} - promise object
   */
  static get(url) {
    return axios.get(url, {
      headers: authHeader(),
    });
  }

  /**
   * Send POST request
   * @param {string} url - request url
   * @param {object} data - request data
   * @returns {AxiosPromise<any>} - promise object
   */
  static post(url, data) {
    return axios.post(url, data, {
      headers: authHeader(),
    });
  }
}
