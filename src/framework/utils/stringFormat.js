/**
 * [StringFormat description] 字符串格式化
 * 例子：let s = utils.StringFormat('{1}+{0}', 'a', 'b') // b+a
 * 例子：let s = utils.StringFormat('{0}+{1}', 'a', 'b') // a+b
 * 例子：let s = utils.StringFormat('【{0}】{1}', 'a', 'b') // 【a】+b
 */
function StringFormat () {
  if (arguments.length === 0) {
    return null
  }
  var str = arguments[0]
  for (var i = 1; i < arguments.length; i++) {
    var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm')
    str = str.replace(re, arguments[i])
  }
  return str
}

export default StringFormat
