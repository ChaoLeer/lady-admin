import Vue from 'vue'
import Vuex from 'vuex'
// 框架状态引用
import frameworkStore from '@/framework/store'
import example from './modules/example'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // 框架状态模块
    ...frameworkStore,
    // 系统状态模块
    example
  }
})

