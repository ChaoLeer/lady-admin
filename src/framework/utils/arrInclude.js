/**
 * 判断数组中的是否包含某项
 * @param {any} arr 目标数组
 * @param {any} item 移除元素
 * @returns 移除后的数组
 */
const include = function (arr = [], item) {
  var i = arr.length
  while (i--) {
    if (arr[i] === item) {
      return true
    }
  }
  return false
}

export default include
