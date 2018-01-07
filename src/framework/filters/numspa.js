/**
 * 千位分隔符，默认使用逗号','分隔
 * @param  {[type]} value  [传入参数]
 * @param  {[type]} splite [分隔符号，可选，默认为逗号',']
 * @return {[type]}        [返回处理后数据]
 */
const numspa = (value, div) => {
  div = div || ','
  return value.toString().replace(/\B(?=(\d{3})+$)/g, div)
}

export default numspa
