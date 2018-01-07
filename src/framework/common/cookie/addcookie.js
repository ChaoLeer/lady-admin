// 发送验证码时添加cookie
let addCookie = function (name, value, expiresHours) {
  var cookieString = name + '=' + escape(value)
  // 判断是否设置过期时间,0代表关闭浏览器时失效
  if (expiresHours > 0) {
    var date = new Date()
    date.setTime(date.getTime() + expiresHours * 1000)
    cookieString = cookieString + ';expires=' + date.toUTCString()
  }
  document.cookie = cookieString
}

export default addCookie
