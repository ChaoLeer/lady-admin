// 修改cookie的值
let editCookie = function (name, value, expiresHours) {
  var cookieString = name + '=' + escape(value)
  if (expiresHours > 0) {
    var date = new Date()
    date.setTime(date.getTime() + expiresHours * 1000) // 单位是毫秒
    cookieString = cookieString + ';expires=' + date.toGMTString()
  }
  document.cookie = cookieString
}

export default editCookie
