import router from './router';
import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { Message } from 'element-ui';
import { getToken } from '@/utils/auth'; // 验权

// permission judge function

/**
 *
 *
 * @param {权限角色} roles
 * @param {授权的权限角色} permissionRoles
 * @returns
 */
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}
const whiteList = ['/login', '/allScreen', '/partScreen']; // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    /* has token */
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // next()
      if (store.getters.roles.length === 0) {
        store
          .dispatch('GetInfo')
          .then(res => {
            // 拉取用户信息
            const roles = res; //  roles array
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // 根据roles权限生成可访问的路由表
              console.log(store.getters.addRouters); // 动态添加可访问路由表
              router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
              next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
            });
          })
          .catch(err => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || '验证失败，请重新登录');
              next({ path: '/' });
            });
          });
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        console.log(to);
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next();
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true } });
        }
      }
    }
  } else {
    /* no token */
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
