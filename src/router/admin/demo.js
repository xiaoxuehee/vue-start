/* Layout */
import Layout from '@/views/layout/Layout';
const demoRouter = {
  path: '/demo',
  component: Layout,
  name: 'demo',
  meta: {
    title: '',
    icon: 'nested',
    roles: ['admin', 'test', 'test1']
  },
  children: [
    {
      path: 'demopage',
      component: () => import('@/views/demo/index'), // Parent router-view
      name: 'demopage',
      meta: { title: '样例页面', roles: ['admin', 'test', 'test1'] }
    }
  ]
};
export default demoRouter;
