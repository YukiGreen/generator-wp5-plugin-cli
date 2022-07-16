import Vue from 'vue';
import VueRouter from 'vue-router';
import { Message } from 'element-ui';

Vue.use(VueRouter);
const template = require.context('./template/', true, /index.vue$/);
let routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('./views/layout/index.vue'),
    meta: { auth: true },
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/login/index.vue')
  },
  {
    path: '/404',
    name: 'noPage',
    component: () => import('./views/errorPage/404.vue')
  }
];
template.keys().forEach(item => {
  const name = item.split('/')[1];
  const url = item.substring(1);
  let route = {
    path: '/' + name,
    name: name,
    meta: { auth: true },
    component: () =>
      import(`./template${url}`)
  };
  routes[0].children.push(route);
});


const getToken = function() {
  const access_token =
    localStorage.getItem('access_token') ||
    sessionStorage.getItem('access_token');
  const refresh_token =
    localStorage.getItem('refresh_token') ||
    sessionStorage.getItem('refresh_token');
  return access_token || refresh_token;
};

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  //根据字段判断是否路由过滤
  if (to.matched.some((record) => record.meta.auth)) {
    // if (getToken() !== null) {
      if (to.path === '/') {
        next({
          path: `/${template.keys()[0].split('/')[1]}`
        });
      } else {
        next();
      }
    // } else {
    //   if (to.path === '/') {
    //     next({
    //       path: '/login'
    //     });
    //     return;
    //   }
    //   //防止无限循环
    //   if (to.name === 'login') {
    //     next();
        
    //   } else {
    //     Message.error('您还未登陆，请先登陆！');
    //     next({
    //       path: '/login'
    //     });
    //   }
    // }
  } else {
    if (to.matched.length === 0) {
      next('/404'); // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
    } else {
      next(); //若点击的是不需要验证的页面,则进行正常的路由跳转
    }
  }
});
export default router;
export { routes };