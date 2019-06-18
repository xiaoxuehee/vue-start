import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

/**
 *从cookie中获取token
 * @export
 */
export function getToken() {
  return Cookies.get(TokenKey);
}

/**
 *存储token到cookie
 * @export
 * @param {String} token
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

/**
 *移除token
 * @export
 */
export function removeToken() {
  return Cookies.remove(TokenKey);
}
