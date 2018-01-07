// const exp = function () {
//   function CommonException (message, code) {
//     this.name = 'CommonException'
//     this.message = message
//     this.code = code
//     return this.name + ' ' + this.message + ':' + this.code
//   }
//   try {
//     throw new CommonException('系统错误', '10001')
//   } catch (error) {
//     console.log(error)
//     console.log(error.name)
//     console.log(error.message)
//     console.log(error.code)
//   }
// }
/**
 * 异常方法抛出
 * @param {any} message 提示信息
 * @param {any} code 自定义异常码
 * @returns 提示框
 */
import Vue from 'vue'
let vm = new Vue()
function CommonException (message, code) {
  this.name = 'CommonException'
  this.message = message
  this.code = code
  vm.$Message.error(this.message)
  return this.name + ' ' + this.message + ':' + this.code
}

export default CommonException
