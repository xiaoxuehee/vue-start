import request from '@/utils/request';

/**
 *
 *
 * @export
 * @param {*} username
 * @param {*} password
 * @returns
 */
export function getTableData(reqData) {
  return request({
    url: '/product/list',
    method: 'get',
    params: {
      pagesize: reqData.pagesize,
      pageindex: reqData.pageindex,
      keyword: reqData.keyword,
      category: reqData.category
    },
    showLoading: true
  });
}
/**
 *
 *
 * @export 获取下拉框数据
 * @param {*} username
 * @param {*} password
 * @returns
 */
export function getCatrogoryData() {
  return request({
    url: '/product/enum-list',
    method: 'get'
  });
}
/**
 *
 *
 * @export
 * @param {产品ID} prodId
 * @returns
 */
export function getProd(prodId) {
  return request({
    url: '/product/get',
    method: 'get',
    params: {
      id: prodId
    }
  });
}
/**
 *
 *
 * @export
 * @param {*} token
 * @returns
 */
export function deleteList(deleteId) {
  return request({
    url: '/product/delete',
    method: 'delete',
    params: {
      id: deleteId
    }
  });
}

/**
 *
 *
 * @export
 * @returns
 */
export function addProd(addRes) {
  debugger;
  return request({
    url: '/product/add',
    method: 'post',
    data: {
      category: addRes.catrgory,
      description: addRes.desciption,
      id: addRes.id,
      name: addRes.name
    }
  });
}
/**
 *
 *
 * @export
 * @returns
 */
export function checkProd(name) {
  return request({
    url: '/product/check',
    method: 'get',
    params: {
      name: name
    }
  });
}
/**
 *
 *
 * @export
 * @returns
 */
export function updateProd(updateRes) {
  return request({
    url: '/product/update',
    method: 'patch',
    data: {
      category: updateRes.catrgory,
      description: updateRes.desciption,
      id: updateRes.id,
      name: updateRes.name
    }
  });
}
