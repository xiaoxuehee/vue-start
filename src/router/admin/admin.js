/* Layout */
import Layout from '@/views/layout/Layout';
const adminRouter = {
  path: '/nested',
  component: Layout,
  name: 'Nested',
  meta: {
    title: '',
    icon: 'nested',
    roles: ['admin', 'test', 'test1']
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: 'Menu1',
      meta: { title: '动态路由', roles: ['admin', 'test'] }
    },
    {
      path: 'menu2',
      component: () => import('@/views/nested/menu2/index'),
      meta: { title: 'menu2', roles: ['admin', 'test1'] }
    }
  ]
};
export default adminRouter;
