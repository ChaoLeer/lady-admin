/**
 * @param ChaoLeer
 * @param 节流函数
 */
function Throttle (fn, delay, atleast) {
  this.fn = fn
  this.delay = delay
  this.atleast = atleast
  this.init()
}

Throttle.prototype = {
  init: function () {
    this.previous = null
    this.timer = null
  },
  detect: function () {
    var now = +new Date()

    if (!this.previous) this.previous = now

    // 如果上一次与本次的时间差大于最小触发值，就走最小触发值的逻辑
    // 否则走 timeout 的逻辑
    if (now - this.previous > this.atleast) {
      this.atleastCond()
    } else {
      this.timeoutCond()
    }
  },
  atleastCond: function () {
    this.fn()
    this.previous = +new Date()
  },
  timeoutCond: function () {
    var _this = this

    clearTimeout(this.timer)
    this.timer = setTimeout(function () {
      _this.fn()
      _this.previous = null
    }, this.delay)
  }
}
export default Throttle
