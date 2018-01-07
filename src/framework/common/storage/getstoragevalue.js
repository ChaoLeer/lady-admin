// 获取storage值
/**
 * [getStorageValue description]
 * @param  {[type]} type [存储类型，两种存储方式 'session', 'local',分别对应sessionStorage和localStorage]
 * @param  {[type]} name [获取的key]
 * @return {[type]}      [返回当前所取key的值，如果能够json格式化，将返回json格式，如果不能，则会以字符串形式返回]
 */
let getStorageValue = function (type, name) {
  let v
  if (type === 'session') {
    v = window.sessionStorage.getItem(name)
  } else if (type === 'local') {
    v = window.localStorage.getItem(name)
  } else {
    console.error('type 不是指定的合法参数，请指定 type 为 session 或 local !')
  }
  if (!v) {
    // console.log('没有对应的值')
    return false
  }
  try {
    return JSON.parse(v)
  } catch (err) {
    // console.warn('系统无法进行json格式化，将返回原数据(string)')
    return v
  }
}

export default getStorageValue
