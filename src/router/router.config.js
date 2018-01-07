/**
 * 路由配置表
 * @type {Array}
 */

const routers = [
  {
    path: '/',
    component: resolve => require(['@/pages/Home.vue'], resolve),
    children: [
      // 示例页面 开发过程中,请将此代码移除
      {
        path: 'home',
        component: resolve => require(['@/pages/Page404.vue'], resolve)
        // children: [{
        //   path: '',
        //   component: resolve => require(['@/views/example/main.vue'], resolve)
        // }, {
        //   path: 'action',
        //   name: 'action',
        //   component: resolve => require(['@/views/example/action.vue'], resolve)
        // }]
      },
      {
        path: '',
        redirect: 'home'
      },
      {
        path: '*',
        name: 'Page404',
        component: resolve => require(['@/pages/Page404.vue'], resolve)
      }
    ]
  },
  {
    path: '*',
    component: resolve => require(['@/pages/Page404.vue'], resolve)
  }
]

export default routers
