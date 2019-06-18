import { Loading } from 'element-ui';

let loading;
/**
 * @description 展示loging
 */
const startLoading = () => {
  loading = Loading.service({
    // 加入target后loading就不是单例，需要去维护loading表 暂时不做
    // target: '.loading-content',
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  });
};

/**
 * @description 关闭loading 当前loading的单例为1是的时候
 */
const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    loading.close();
  }
};

let needLoadingRequestCount = 0;

/**
 * @description 展示loading
 * @export
 */
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

/**
 * @description 关闭Loading
 * @export
 */
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    setTimeout(() => {
      tryCloseLoading();
    }, 300);
  }
}
