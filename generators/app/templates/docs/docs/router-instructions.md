
<h1 style="font-size: 30px;text-align: center">路由使用说明</h1>

## 路由的定义

组件内的路由跳转配置，可写在`src/routers/index.ts`中，结构按照官网的`RouteConfig`结构定义，范例结构如下：

```javascript
export default [
  {
    path: 'header-one',
    name: 'header-one',
    show: true,
    component: { render: (e) => e("router-view") },
    children: [
      {
        path: 'hello-world',
        name: 'hello-world',
        show: true,
        component: () => import('../../packages/helloModule'),
      },
      {
        path: 'hello-edit',
        name: 'hello-edit',
        show: false,
        component: () => import('../../packages/helloEdit'),
      }
    ]
  }
];
```

## 路由的使用

使用方式一：在壳子项目`main.ts`中引入路由并动态添加
```javascript
import{ pluginRouters } from 'plugin-ui';

// 动态注册路由
pluginRouters.forEach(ele => {
  vueIns.$router.addRoute('component', ele);
})
```

使用方式二：在壳子项目路由配置文件中使用
```javascript
import{ pluginRouters } from 'plugin-ui';

let routes = [{...}, ...];  // 壳子项目中定义的路由规则

routes.push(...pluginRouters);

export default new Router({
  routes
});

```