import { tokenType } from '../constants';

/**
 * Authentication token service
 */
export class TokenService {
  /**
   * Get Access token
   * @return {string} - access token
   */
  static get accessToken() {
    return localStorage.getItem(tokenType.ACCESS);
  }

  /**
   * Set new access token
   * @param {string} token - new token
   */
  static set accessToken(token) {
    return localStorage.setItem(tokenType.ACCESS, token);
  }

  /**
   * Get refresh token
   * @return {string} - refresh token
   */
  static get refreshToken() {
    return localStorage.getItem(tokenType.REFRESH);
  }

  /**
   * Set new refresh token
   * @param {string} token - new token
   */
  static set refreshToken(token) {
    return localStorage.setItem(tokenType.REFRESH, token);
  }

  /**
   * Remove all token types from local storage
   * @return {void}
   */
  static destroyTokens() {
    Object.values(tokenType).forEach(type => {
      localStorage.removeItem(type);
    });
  }
}
