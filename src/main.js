// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'normalize.css'
import 'animate.css'
import 'font-awesome/css/font-awesome.min.css'
import '../static/font/ladyicon/iconfont.css'

import '@/conifg'
import '@/framework/components/index.js'
import '@/framework/directives/index.js'
import '@/framework/mixins/index.js'

// Vue.config.productionTip = false
console.log('%c%s', 'color: rgba(255, 64, 252, 0.9);font-size: 12px;font-style: italic;', '欢迎使用lady前端admin后台管理系统')
console.info(Vue.config)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
