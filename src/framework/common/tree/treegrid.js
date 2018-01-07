/**
 * 将自关联表的一般的JSON格式转为EasyUI TreeGrid树控件的JSON格式
 * @param {Object} rows
 * @param {Object} id 必须唯一
 * @param {Object} ParentId
 */
var ConvertToTreeGridJsonFy = function (rows, id, ParentId) {
  if (rows === null || rows === undefined) {
    return null
  }
  // 校验节点
  var nodes = {}
  for (var i = 0; i < rows.length; i++) {
    nodes[rows[i][id]] = i
  }
  // 存储没有父节点的节点
  var nodes1 = []
  // 存储有父节点的节点
  var nodes2 = []
  for (let i = 0; i < rows.length; i++) {
    if (
      nodes[rows[i][ParentId]] !== undefined && nodes[rows[i][ParentId]] !== i
    ) {
      nodes2.push(rows[i])
    } else {
      nodes1.push(rows[i])
    }
  }

  if (nodes2.length > 0) {
    var nodes3 = ConvertToTreeGridJsonFy(nodes2, id, ParentId)
    for (let i = 0; i < nodes3.length; i++) {
      for (var j = 0; j < nodes1.length; j++) {
        if (nodes3[i][ParentId] === nodes1[j][id]) {
          if (nodes1[j].children) {
            nodes1[j].children.push(nodes3[i])
          } else {
            nodes1[j].children = [nodes3[i]]
          }
          break
        }
      }
    }
  }
  return nodes1
}

export default ConvertToTreeGridJsonFy
