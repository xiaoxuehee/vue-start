import request from '@/utils/request';

/**
 * @param {String} username
 * @param {String} password
 * @param {String} verificationCode
 */
export function login(username, password, verificationCode) {
  return request({
    url: '/user/get',
    method: 'get',
    params: {
      username,
      password,
      verificationCode
    }
  });
}

/**
 * @export
 * @param {*} token
 */
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

/**
 * @export
 * @returns
 */
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  });
}
