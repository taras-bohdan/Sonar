import axios from 'axios/index';

export class httpService {
  static get(url) {
    return axios.get(url);
  }

  static post(url, data) {
    return axios.post(url, data);
  }
}
