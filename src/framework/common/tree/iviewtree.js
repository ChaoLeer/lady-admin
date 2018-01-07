/**
 * 将JSON格式数据转换为iviewui树控件的JSON格式   支持有children子节点的json格式
 * @param {Object} rows
 * @param {Object} showcolname
 */
var ConvertToIViewTreeJsonFy = function (rows, showcolname) {
  var node1 = []
  for (var i = 0; i < rows.length; i++) {
    var tempJson = {}
    tempJson.expand = false
    tempJson.disabled = false
    tempJson.disableCheckbox = false
    tempJson.checked = false
    tempJson.title = rows[i][showcolname]
    if (rows[i].children !== undefined && rows[i].children !== null) {
      tempJson.children = ConvertToIViewTreeJsonFy(
        rows[i].children,
        showcolname
      )
    }
    node1.push(tempJson)
  }
  return node1
}
export default ConvertToIViewTreeJsonFy
