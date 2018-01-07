// 设置storeage
/**
 * [setStorage description]
 * @param {[type]} type  [存储类型，两种存储方式 'session', 'local',分别对应sessionStorage和localStorage]
 * @param {[type]} name  [存储的key]
 * @param {[type]} value [存储的value]
 * @param [存储，如果是json格式，将自动进行json转字符串存储]
 */
let setStorage = function (type, name, value) {
  let storage
  if (type === 'session') {
    storage = window.sessionStorage
  } else if (type === 'local') {
    storage = window.localStorage
  } else {
    console.error('type 不是指定的合法参数，请指定 type 为 session 或 local !')
  }
  console.log()
  if (value instanceof Object) {
    // console.log('************************************是 Obj')
    storage.setItem(name, JSON.stringify(value))
  } else {
    // console.log('************************************不是 Obj')
    storage.setItem(name, value)
  }
}

export default setStorage
