import $ from 'jquery'
const FormateGroupData = function (data, type, isStack) {
  let charttype = 'line'
  if (type) {
    charttype = type || 'line'
  }
  let xAxis = []
  let group = []
  let series = []
  for (let i = 0; i < data.length; i++) {
    for (var j = 0; j < xAxis.length && xAxis[j] !== data[i].name; j++);
    if (j === xAxis.length) {
      xAxis.push(data[i].name)
    }
    for (var k = 0; k < group.length && group[k] !== data[i].group; k++);
    if (k === group.length) {
      group.push(data[i].group)
    }
  }
  for (let i = 0; i < group.length; i++) {
    let temp = []
    for (let j = 0; j < data.length; j++) {
      if (group[i] === data[j].group) {
        if (type === 'map') {
          temp.push({
            name: data[j].name,
            value: data[i].value
          })
        } else temp.push(data[j].value)
      }
    }
    if (group[i] === 'SUCC') {
      group[i] = '成功次数'
    } else {
      group[i] = '失败次数'
    }
    let seriestemp
    switch (type) {
      case 'bar':
        seriestemp = {
          name: group[i],
          data: temp,
          type: charttype
        }
        if (isStack) {
          seriestemp = $.extend(
            {},
            {
              stack: 'stack'
            },
            seriestemp
          )
        }
        break

      case 'line':
        seriestemp = {
          name: group[i],
          data: temp,
          type: charttype
        }
        if (isStack) {
          seriestemp = $.extend(
            {},
            {
              stack: 'stack'
            },
            seriestemp
          )
        }
        break

      default:
        seriestemp = {
          name: group[i],
          data: temp,
          type: charttype
        }
    }
    series.push(seriestemp)
  }
  return {
    category: group,
    xAxis: xAxis,
    series: series
  }
}
export default FormateGroupData
