import Vue from 'vue';
import VueRouter from 'vue-router';
import navCpnfig from './nav.config.json';
import { Message } from 'element-ui';

Vue.use(VueRouter);
let route = navCpnfig['zh-CN'];
let routes = [];
route.forEach(item => {
  if (item.path) {
    let obj = {};
    obj = {
      path: '/component' + item.path,
      name: item.path,
      meta: { auth: true },
      component: () => import(`./docs${item.path}.md`)
    };
    routes.push(obj);
  } else if (item.children) {
    item.children.forEach(ele => {
      let obj = {};
      obj = {
        path: '/component' + ele.path,
        name: ele.path,
        meta: { auth: true },
        component: () => import(`./docs${ele.path}.md`)
      };
      routes.push(obj);
    });
  } else if (item.groups) {
    item.groups.forEach(ele => {
      ele.list.forEach(key => {
        let obj = {};
        obj = {
          path: '/component' + key.path,
          name: key.path,
          meta: { auth: true },
          component: () => import(`./docs${key.path}.md`)
        };
        routes.push(obj);
      });
    });
  }
});

routes = [
  {
    path: '/',
    redirect: '/component/changelog'
  },
  {
    path: '/component',
    name: 'component',
    meta: { auth: true },
    component: () => import('./layout/index.vue'),
    children: routes
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./layout/components/login/index.vue')
  },
  {
    path: '/404',
    name: 'noPage',
    component: () => import('./layout/components/errorPage/404.vue')
  }
]

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
  //????????????????????????????????????
  if (to.matched.some((record) => record.meta.auth)) {
    if (getToken() !== null) {
      if (to.path === '/') {
        next({
          path: `/component/changelog`
        });
      } else {
        next();
      }
    } else {
      if (to.path === '/') {
        next({
          path: '/login'
        });
        return;
      }
      //??????????????????
      if (to.name === 'login') {
        next();
        
      } else {
        Message.error('?????????????????????????????????');
        next({
          path: '/login'
        });
      }
    }
  } else {
    if (to.matched.length === 0) {
      next('/404'); // ?????????????????????????????????????????????????????????????????????????????????????????????????????????404??????
    } else {
      next(); //???????????????????????????????????????,??????????????????????????????
    }
  }
});

export default router;
