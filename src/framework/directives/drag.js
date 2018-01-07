/*
 * @Author: ChaoLeer
 * @Date: 2017-08-23 09:17:32
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-08-23 09:17:52
 * @Description: drag拖动指令，v-drag详见文档
 */
export default {
  inserted: function (el, binding) {
    // 拖拽时的手势
    el.style.cursor = binding.value && binding.value.cursor
      ? binding.value.cursor
      : 'move'

    let $ele = el
    if (binding.value) {
      // 如果拖动元素非元素本身（el），传入id
      $ele = binding.value.id
      ? document.getElementById(binding.value.id)
      // 如果拖动元素非元素本身（el），传入el
      : binding.value.element
      ? binding.value.element
      : el
    }

    // 为拖动元素添加绝对定位
    $ele.style.position = 'absolute'

    // 如果容器为设置position属性，默认为 position = 'relative'
    if (getComputedStyle($ele.parentNode, null).position === 'static') {
      $ele.parentNode.style.position = 'relative'
    }

    let mouseDownFn = function (e) {
      // .fade---------- 复制节点，并且插入容器中原来位置
      if (binding.modifiers.fade) {
        var newNode = $ele.cloneNode(true)
        $ele.style.opacity = '0.5'
        $ele.parentNode.appendChild(newNode)
      }
      // ----------

      let disX, disY
      if (!binding.modifiers.dragY) disX = e.clientX - $ele.offsetLeft
      if (!binding.modifiers.dragX) disY = e.clientY - $ele.offsetTop
      let mouseMoveFn = function (e) {
        e.preventDefault()
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 可以拖出去的元素的剩余宽度
        // dragOutX
        let limitWidth = binding.value && binding.value.dragOutX
          ? $ele.offsetWidth - binding.value.dragOutX
          : 0
        // dragOutY
        let limitHeigth
        let limitHeigthTop
        if (binding.value && binding.value.dragOutY) {
          limitHeigth = $ele.offsetHeight - binding.value.dragOutY
          // 防止可拖拽区域被拖出容器区域
          // 拖拽元素在顶部
          limitHeigthTop = el.offsetHeight - binding.value.dragOutY
        } else {
          limitHeigth = 0
          limitHeigthTop = 0
        }

        if (left < 0 - limitWidth) {
          left = 0 - limitWidth
        } else if (
          left > $ele.parentNode.clientWidth - $ele.offsetWidth + limitWidth
        ) {
          left = $ele.parentNode.clientWidth -
            $ele.offsetWidth +
            limitWidth
        }

        if (top < 0 - limitHeigthTop) {
          top = 0 - limitHeigthTop
        } else if (
          top >
          $ele.parentNode.clientHeight - $ele.offsetHeight + limitHeigth
        ) {
          top = $ele.parentNode.clientHeight -
            $ele.offsetHeight +
            limitHeigth
        }
        $ele.style.left = left + 'px'
        $ele.style.top = top + 'px'

        // 拖拽事件
        if (binding.value && binding.value.ondrag) {
          if (typeof binding.value.ondrag !== 'function') { throw console.error('ondrag: should be a function') }
          binding.value.ondrag(e, {left: left, top: top})
        }
      }
      // mousemove
      document.addEventListener('mousemove', mouseMoveFn)

      let mouseUpFn = function () {
        // 移除临时fade节点
        if (newNode) {
          $ele.style.opacity = '1'
          newNode.parentNode.removeChild(newNode)
        }
        document.removeEventListener('mousemove', mouseMoveFn)
        document.removeEventListener('mouseup', mouseUpFn)
      }
      //  mouseup
      document.addEventListener('mouseup', mouseUpFn)
    }

    // mousedown
    el.addEventListener('mousedown', mouseDownFn)
  }
}
