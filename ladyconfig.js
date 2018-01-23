/**
 * 系统所有的配置项
 * 注意： 打包完成后请将此文件copy到index.html同级目录
 */
window.ladyConfig = {
  // 权限子系统后台服务地址baseURL(仅读取菜单用 部署权限子系统的后台服务IP)
  'apiSSOBaseConfigURL': 'http://192.168.25.143:8021s',
  // 权限子系统后台服务地址baseURL(业务调用 其他子系统更新自己的后台服务IP)
  'apiBaseConfigURL': 'http://192.168.25.143:8021s',
  // 单点登录系统登录URL(前端登录服务IP)
  'loginHost': 'http://192.168.25.143:80/sso',
  // theme 默认主题,注: 此处只是设置一个默认的主题,且需为已配置好的主题名称,不可随意赋值,现支持的主题色名称如下
  // green, lightBlueA700, orange, teal600, deeporange, dark, dark, brown, bluegrey, cyan800
  'theme': 'bluegrey'
}
