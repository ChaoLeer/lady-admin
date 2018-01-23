/**
 * 系统所有的配置项
 */
import vuelists from './menu.config.js'

// 自动检测读取外部配置
Object.keys(window.ladyConfig).forEach(item => {
  global[item] = window.ladyConfig[item]
})

// 是否需要头信息带orgid
global.orgid = false

// 是否开启全局异常提示(分为sso提示、业务后台提示)
// false即只提示sso登录拦截信息，业务系统后台异常不予提示，需自行处理异常信息提示
// true则不需，将会在api拦截器中进行所有的异常提示，无需业务系统前台处理异常提示
global.cacheMessage = true

// 是否开启标签，开启后面包屑导航将会失效, 默认不开启
global.tabsModal = true

export default vuelists
