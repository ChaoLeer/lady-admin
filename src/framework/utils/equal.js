/*
 * @Author: ChaoLeer
 * @Date: 2017-08-23 11:03:35
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-08-23 11:04:00
 * @Description: 判断类型，是否为方法，是否为字符串，是否为对像，是否为promise
 */
export function isFunction (fn) {
  if (!fn) {
    return false
  }
  return typeof fn === 'function'
}

export function isString (str) {
  if (!str) {
    return false
  }
  return typeof str === 'string'
}

export function isObject (obj) {
  if (!obj) {
    return false
  }
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isPromise (_p) {
  if (
    _p !== null &&
    (typeof _p === 'object' || typeof _p === 'function') &&
    typeof _p.then === 'function'
  ) {
    // 这是一个promise对象
    // console.info('这是一个promise对象')
    return true
  } else {
    return false
  }
}
