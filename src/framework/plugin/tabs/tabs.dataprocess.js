import { ConvertToTreeGridJsonFy } from '../../common/tree'
import { getStorageValue } from '../../common/storage'
// import jquery from 'jquery'
import { vuelists, tabsMenuType } from './tabs.config.js'

var ConvertToIViewMenuJsonFy = function (rows, id, menuname, menuicon, menuurl) {
  var arr = []
  for (var i = 0; i < rows.length; i++) {
    let tempJson = {}
    tempJson.name = rows[i][id]
    tempJson.title = rows[i][menuname]
    tempJson.iconCls = rows[i][menuicon]
    if (rows[i].children !== undefined && rows[i].children != null) {
      tempJson.only = true
      tempJson.component = null
      tempJson.children = ConvertToIViewMenuJsonFy(
        rows[i].children,
        id,
        menuname,
        menuicon,
        menuurl
      )
    } else {
      tempJson.only = false
      tempJson.component = vuelists[rows[i][menuurl]]
      tempJson.menuurl = rows[i][menuurl]
    }

    arr.push(tempJson)
  }
  return arr
}

var ConvertToIViewMenuTabJsonFy = function (rows, item, menuname, menuicon) {
  var arr = []
  for (var i = 0; i < rows.length; i++) {
    if (item !== undefined || item !== null) {
      rows[i].parentTitle = item.title
      rows[i].parentIconCls = item.iconCls
    }
    arr.push(rows[i])
    if (rows[i].children !== undefined && rows[i].children != null) {
      arr.push.apply(
        arr,
        ConvertToIViewMenuTabJsonFy(
          rows[i].children,
          rows[i],
          menuname,
          menuicon
        )
      )
    }
  }
  return arr
}
import { apiSSOBaseConfig } from '../../../api'
var tabsdatas = []
var tabs = []
var tabstemps = []
if (!tabsMenuType) {
  tabstemps = tabsdatas = vuelists
  tabs = ConvertToIViewMenuTabJsonFy(tabstemps, 'menuname', 'menuicon')
} else {
  var passJson = {}
  passJson.appno = getStorageValue('local', 'user').appNo
  var remoteData = new Promise((resolve, reject) => {
    apiSSOBaseConfig.post('/sysapimenu/findmenubyappno', passJson).then(res => {
      resolve(res.data)
    })
  })
  var tabstempsPromise = new Promise((resolve, reject) => {
    remoteData.then(d => {
      tabsdatas = d
      let tempJson = ConvertToTreeGridJsonFy(tabsdatas, 'id', 'parentmenuid')
      let tabstemps = ConvertToIViewMenuJsonFy(
        tempJson,
        'id',
        'menuname',
        'menuicon',
        'menuurl'
      )
      // tabstemps.splice(2, 0, {
      //   only: false,
      //   name: 'home',
      //   title: '首页',
      //   iconCls: 'fa fa-home',
      //   menuurl: 'home'
      // })
      resolve(tabstemps)
    })
  })
  var tabsPromise = new Promise((resolve, reject) => {
    tabstempsPromise.then(d => {
      let temp = ConvertToIViewMenuTabJsonFy(d, 'menuname', 'menuicon')
      resolve(temp)
    })
  })
}

export { tabstemps, tabstempsPromise, tabsPromise, tabs }
