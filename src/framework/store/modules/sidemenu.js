import {setStorage, getStorageValue} from '@/framework/common/storage'
import { ArrRemove } from '@/framework/utils'

// states
const state = {
  collapseState: false,
  breadcrumbRoot: null,
  tabsList: getStorageValue('local', 'sideMenu').tabsList || [],
  menuList: getStorageValue('local', 'sideMenu').menuList || []
}

// getters
const getters = {
  // ladyTabs: state => {
  //   let tabs = []
  //   state.tabsList.forEach(item => {
  //     tabs.push(JSON.parse(item))
  //   })
  //   return tabs
  // }
}
// mutations
const mutations = {
  /**
   * 收起左侧菜单
   * @param{any}{commit, state}
   */
  COLLAPSE_SLIDEMENU (state) {
    state.collapseState = false
  },
  /**
   * 展开左侧菜单
   * @param{any}{commit, state}
   */
  OPEN_SLIDEMENU (state) {
    state.collapseState = true
  },
  /**
   * 更新当前面包屑(左侧菜单渲染的时候生效)
   * @param{any}state
   * @param{any}path
   */
  UPDATE_BREADPATH (state, obj) {
    // console.info(obj)
    let tempRoot = obj.root
    if (obj.curr.length > 0) {
      console.info(obj)
      tempRoot.children = [...obj.curr]
    }
    state.breadcrumbRoot = tempRoot
    setStorage('local', 'sideMenu', state)
  },
  /**
   * 更新当前面包屑(左侧菜单销毁的时候生效)
   * @param{any}{commit, state}
   * @param{any}path
   */
  UPDATE_SIDE_MENU_RENDER_BREAKMENU (state, ob) {
    state.sideMenuRenderBreakMenu = ob
    setStorage('local', 'sideMenu', state)
  },
  /**
   * 主内容区域渲染状态
   * @param{any}state
   * @param{any}s
   */
  MAIN_RENDER (state, s) {
    state.mainState = s
  },
  /**
   * 添加菜单项(在系统初始化的时候储存菜单)
   * @param{any}state
   * @param{any}k
   */
  PUSH_MENU_LIST (state, k) {
    // setStorage('local', 'sideMenu', {'menuList': k})
    state.menuList = k
    setStorage('local', 'sideMenu', state)
  },
  /**
   * 更新当前选中菜单(仅限于左侧菜单)
   * @param{any}state
   * @param{any}k
   */
  UPDATE_CURR_MENU (state, k) {
    state.currMenu = k
    setStorage('local', 'sideMenu', state)
  },
  /**
   * 添加tab
   * @param{any}state
   * @param{any}t
   */
  ADD_TAB (state, t) {
    var tabs = [t]
    state.tabsList.forEach(itm => {
      if (itm.menuurl !== t.menuurl) {
        tabs.push(itm)
      }
    })
    state.tabsList = [...tabs]
    setStorage('local', 'sideMenu', state)
  },
  /**
   * 删除移除tab
   * @param{any}state
   * @param{any}t
   */
  DELETE_TAB (state, t) {
    // state.tabsList.push(t)
    // let tmpTabs = state.tabsList.filter(itm => {
    //   return itm !== t
    // })
    // state.tabsList = [...tmpTabs]
    // state.tabsList = state.tabsList.filter(itm => {
    //   return itm.menuurl !== t.menuurl
    // })
    ArrRemove(state.tabsList, t)
    setStorage('local', 'sideMenu', state)
  }
}
// actions
const actions = {
  /**
   * 收起左侧菜单
   * @param{any}{commit, state}
   */
  collapseSlidemenu ({commit, state}) {
    commit('COLLAPSE_SLIDEMENU')
  },
  /**
   * 展开左侧菜单
   * @param{any}{commit, state}
   */
  openSlidemenu ({commit, state}) {
    commit('OPEN_SLIDEMENU')
  },
  /**
   * 添加菜单项(在系统初始化的时候储存菜单)
   * @param{any}state
   * @param{any}k
   */
  initMenuList ({commit, state}, k) {
    // setStorage('local', 'sideMenu', {'menuList': k})
    commit('PUSH_MENU_LIST', k)
  },
  /**
   * 更新当前面包屑(左侧菜单渲染的时候生效)
   * @param{any}state
   * @param{any}path
   */
  updateBreadpath ({commit, state}, obj) {
    // console.info(obj)
    commit('UPDATE_BREADPATH', obj)
  },
  /**
   * 主内容区域渲染状态
   * @param{any}state
   * @param{any}s
   */
  mainRender ({commit, state}, s) {
    commit('MAIN_RENDER', s)
  },
  /**
   * 更新当前选中菜单(仅限于左侧菜单)
   * @param{any}state
   * @param{any}k
   */
  updateCurrMenu ({commit, state}, k) {
    commit('UPDATE_CURR_MENU', k)
  },
  /**
   * 添加tab
   * @param{any}state
   * @param{any}t
   */
  addTab ({commit, state}, t) {
    commit('ADD_TAB', t)
  },
  /**
   * 删除移除tab
   * @param{any}state
   * @param{any}t
   */
  deleteTab ({commit, state}, t) {
    commit('DELETE_TAB', t)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
