import Vue from 'vue'
// import vm from '../../../main.js'
import './css/vue-tabs.css'
import { tabs, tabsPromise } from './tabs.dataprocess.js'
import { Exception } from '../../utils'

function vueTaberHo (v) {
  global.tabslength = ''
  const maxlength = 12
  v.beforeCreateEach((tab, next) => {
    // console.log(tab)
    if (global.tabslength < maxlength) {
      next()
    } else {
      try {
        throw new Exception('已超出打开上限，请先关闭一些窗口后再打开', '10001', new Vue())
      } catch (error) {
        console.log(error)
      }
    }
  })
  v.beforeCloseEach((tab, next) => {
    if (global.tabslength === 0) {
      next('home')
      console.log('转home后长度' + global.tabslength)
    } else {
      if (tab.name === 'home') {
        try {
          // console.info(vm)
          throw new Exception('首页不可关闭', '10001', new Vue())
        } catch (error) {
          console.log(error)
        }
      } else {
        next()
      }
    }
  })
  // Vue.use(v)
}

export { vueTaberHo, tabs, tabsPromise }
