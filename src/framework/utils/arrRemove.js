/**
 * 移除数组中的某项
 * @param {any} arr 目标数组
 * @param {any} item 移除元素
 * @returns 移除后的数组
 */
const remove = function (arr, item) {
  if (!arr.length) return
  var index = arr.indexOf(item)
  if (index > -1) {
    let rstarr = arr.splice(index, 1)
    return rstarr
  }
}

export default remove
