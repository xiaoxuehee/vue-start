import axios from 'axios';
import { Message } from 'element-ui';
import store from '../store';
import { getToken } from '@/utils/auth';
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/loading';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (config.showLoading) {
      // 全屏loading
      showFullScreenLoading();
    }
    if (store.getters.token) {
      config.headers['X-Token'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  error => {
    // Do something with request error
    tryHideFullScreenLoading();
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    if (response.config.showLoading) {
      tryHideFullScreenLoading(); // 关闭全屏Loading
    }
    const res = response.data;
    if (res.code !== 200) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject('error');
    } else {
      return response.data;
    }
  },
  error => {
    tryHideFullScreenLoading();
    console.log('err' + error); // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
