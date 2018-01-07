/**
 * 手动触发window的resize事件
 */
const DispatchResize = () => {
  setTimeout(function () {
    if (document.createEvent) {
      var event = document.createEvent('HTMLEvents')
      event.initEvent('resize', true, true)
      window.dispatchEvent(event)
    } else if (document.createEventObject) {
      window.fireEvent('onresize')
    }
  }, 300)
}

export default DispatchResize
