import Vue from 'vue'
import Router from 'vue-router'
import routes from './router.config'
// import NProgress from 'nprogress'// 页面顶部加载进度条
// import 'nprogress/nprogress.css'// 页面顶部加载进度条css
import {setStorage, getStorageValue} from '@/framework/common/storage'
Vue.use(Router)

const router = new Router({
  routes
})
if (window.name === '' || window.name === null) {
  // sessionStorage.clear()
} else {
  setStorage('local', 'user', window.name)
  window.name = ''
}
// 监听路由跳转前变化
router.beforeEach((to, from, next) => {
  if (!getStorageValue('local', 'user')) {
    // console.log(to.fullPath)
    // window.location.href = global.loginHost
    next()
  } else {
    // NProgress.start()
    next()
  }
})

// 监听路由跳转完成变化
router.afterEach(transition => {
  // NProgress.done()
  global.tabslength = 0
})

export default router
