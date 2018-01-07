/**
 * 系统所有的配置项
 */
// 子系统后台服务地址baseURL(仅读取菜单用 部署权限子系统\SSO的后台服务IP)
// global.apiSSOBaseConfigURL = 'http://192.168.25.102'
global.apiSSOBaseConfigURL = window.ladyConfig.apiSSOBaseConfigURL

// 子系统后台服务地址baseURL(业务调用 其他子系统更新自己的后台服务IP)
global.apiBaseConfigURL = window.ladyConfig.apiBaseConfigURL

// 单点登录系统登录URL(前端登录服务IP)
global.loginHost = window.ladyConfig.loginHost

// theme 默认主题,注: 此处只是设置一个默认的主题,且需为已配置好的主题名称,不可随意赋值,现支持的主题色名称如下
// green, lightBlueA700, orange, teal600, deeporange, dark, dark, brown, bluegrey, cyan800
global.theme = 'bluegrey'

// 是否需要头信息带orgid
global.orgid = false

// 是否开启全局异常提示(分为sso提示、业务后台提示)
// false即只提示sso登录拦截信息，业务系统后台异常不予提示，需自行处理异常信息提示
// true则不需，将会在api拦截器中进行所有的异常提示，无需业务系统前台处理异常提示
global.cacheMessage = true

// 是否开启标签，开启后面包屑导航将会失效, 默认不开启
global.tabsModal = true
