// import api from '../../api'
/**
 * [vuelists 中pageconfig字段为页面配置]
 * [vuelists 中local字段为是否本地配置, true为本地配置,false为远程请求]
 * @type {Object}
 * 下面是两种示例
 */
// 注意:修改完menuLevel后请务必退出重新登录或者清空storage里的sidemenu存储
global.menuLevel = 3
// 这是本地配置栗子
var vuelists = {
  local: true,
  pageconfig: [
    {
      'only': true,
      'name': 'home',
      'title': '首页',
      'iconCls': 'fa fa-home',
      'menuurl': 'home'
    },
    {
      'name': '54c12bcb0e1511e7858b60a44ce84a90',
      'title': '测试',
      'iconCls': 'fa fa-users',
      'only': false,
      'children': [
        {
          'name': '54d5e8740e1511e7858b60a44ce84a90s',
          'title': '测试1',
          'iconCls': 'fa fa-user-circle-o',
          'only': true,
          'menuurl': 'createdocfile'
        },
        {
          'name': '54d5e8740e1511e7858b60a4s4ce84a9s0',
          'title': '测试2',
          'iconCls': 'fa fa-user-circle-o',
          'only': true,
          'menuurl': 'createdocfsiles'
        },
        {
          'name': '54d5e8740e1511e7858b60a44ce84a90sss',
          'title': '测试3',
          'iconCls': 'fa fa-user-circle-o',
          'only': true,
          'menuurl': 'createdocfilea'
        },
        {
          'name': '54d5e8740e1511e7858b60a4s4ce84a9s0aa',
          'title': '测试4',
          'iconCls': 'fa fa-user-circle-o',
          'only': true,
          'menuurl': 'createdocfsilebs'
        },
        {
          'name': '54d5e8740e1511e7858b60a44ce84a90ss',
          'title': '测试5',
          'iconCls': 'fa fa-user-circle-o',
          'only': true,
          'menuurl': 'createdocfilve'
        },
        {
          'name': '54d5e8740e1511e7858b60a4s4ce84a9s0a',
          'title': '测试6',
          'iconCls': 'fa fa-user-circle-o',
          'only': true,
          'menuurl': 'createdocfsicles'
        }
      ]
    },
    {
      'only': true,
      'name': 'set',
      'title': '设置',
      'iconCls': 'fa fa-cog',
      'menuurl': 'set'
    }
  ]
}

// 此处正式开发环境不需要
// import { setStorage } from '../framework/common/storage'
// setStorage('local', 'user', {
//   id: '0AC215E565C3489FA5D93FFC66218757',
//   usertoken: '4D14A2BDB36142B38EA93BEBE2F22C1E',
//   appNo: '3C4FFC8442AC40818AE329D7FD381830'
// })

// // 这是远程请求栗子 //todo 远程index为必配项
// var vuelists = {
//   local: true,
//   pageconfig: {
//     // index: index
//   }
// }
export default vuelists
