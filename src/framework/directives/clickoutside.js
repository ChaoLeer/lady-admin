/*
 * @Author: ChaoLeer
 * @Date: 2017-08-23 09:15:29
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-08-23 09:17:21
 * @Description: clickoutside指令，点击当前绑定元素外触发方法
 *    v-clickoutside="func",在点击当前元素之外位置会触发func方法
 */
export default {
  bind (el, binding, vnode) {
    function documentHandler (e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update () {},
  unbind (el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
