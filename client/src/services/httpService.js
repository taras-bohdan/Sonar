import axios from 'axios/index';
import { authHeader } from '../helpers';

export class httpService {
  static get(url) {
    return axios.get(url, {
      headers: authHeader(),
    });
  }

  static post(url, data) {
    return axios.post(url, data, {
      headers: authHeader(),
    });
  }

  
  
  static post_duplicate(url, data) {
    return axios.post(url, data, {
      headers: authHeader(),
    });
  }
}
