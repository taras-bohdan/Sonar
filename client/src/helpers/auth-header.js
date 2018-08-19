/**
 * Get authorization header from local storage
 * @returns {*} - auth token
 */
export function authHeader() {
  // return authorization header with jwt token
  const token = localStorage.getItem('userToken');

  if (token) {
    return { 'Authorization': 'Bearer ' + token };
  } else {
    return {};
  }
}
