import {StringFormat, Format} from './index.js'

// 日志打印
function Log (msg) {
  var str = StringFormat('【{0}】{1}', Format(new Date(), 'yyyy-MM-dd hh:mm:ss'), msg)
  console.log(str)
}

export default Log
