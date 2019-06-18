import request from '@/utils/request';

/**
 *
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  });
}
