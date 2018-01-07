/**
 * 检测是否为数组中的某一项
 * @param {any} val 当前检测项
 * @param {any} [arr=[]] 目标数组
 * @param {string} [name=''] error提示名称信息(组件封装中使用)
 * @returns Boolean 成功为true,未检测到为false
 */
const oneOf = function (val, arr = [], name = '') {
  let flg = arr.includes(val)
  flg ? '' : name === '' ? '' : console.error(`[Climb warn]: ${name} must be one of ${arr},but got ${val}`)
  return flg
}

export default oneOf

