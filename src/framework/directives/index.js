// 指令
import Vue from 'vue'
import drag from './drag.js'
import clickoutside from './clickoutside.js'
import transfordom from './transfordom.js'
const directives = {
  drag,
  clickoutside,
  transfordom
}
Object.keys(directives).forEach(function (k) {
  Vue.directive(k, directives[k])
})
