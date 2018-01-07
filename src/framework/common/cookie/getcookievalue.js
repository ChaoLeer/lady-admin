// 根据名字获取cookie的值
let getCookieValue = function (name) {
  var strCookie = document.cookie
  var arrCookie = strCookie.split('; ')
  for (var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split('=')
    if (arr[0] === name) {
      return unescape(arr[1])
    }
  }
}

export default getCookieValue
