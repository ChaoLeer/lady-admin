import {StringFormat, Format} from './index.js'

// 日志打印
function Log (msg) {
  if (typeof console !== undefined) {
    var str = StringFormat('【{0}】{1}', Format(new Date(), 'yyyy-MM-dd hh:mm:ss'), msg)
    console.log(str)
  }
}

export default Log
