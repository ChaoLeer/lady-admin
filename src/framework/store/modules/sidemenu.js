import {setStorage, getStorageValue} from '@/framework/common/storage'
import { Equal } from '@/framework/utils'
import { frameMenu, frameMenuPromise } from '@/framework/common/menu'
// states
const renderFlag = function () {
  if (global.menuLevel === 2) {
    return true
  } else {
    let flg = getStorageValue('local', 'sideMenu').sideMenuList && getStorageValue('local', 'sideMenu').sideMenuList.length > 0
    return flg
  }
}
const sideFlg = renderFlag()
const openNamesFlag = getStorageValue('local', 'sideMenu').currOpenNames && getStorageValue('local', 'sideMenu').currOpenNames.length > 0

const state = {
  sidemenuState: true,
  sideMenuRender: sideFlg,
  sideMenuRenderBreakMenu: getStorageValue('local', 'sideMenu').sideMenuRenderBreakMenu || {},
  tabsleft: 0,
  mainState: false,
  currSys: getStorageValue('local', 'sideMenu').currSys || '',
  currMenu: getStorageValue('local', 'sideMenu').currMenu || '',
  currOpenNames: getStorageValue('local', 'sideMenu').currOpenNames || [],
  sideMenuList: openNamesFlag ? getStorageValue('local', 'sideMenu').sideMenuList : [],
  menuList: getStorageValue('local', 'sideMenu').menuList || []
}

// getters
const getters = {
  getSidemenuState: state => state.sidemenuState,
  getBreadPath: state => state.breadpath,
  getTabsLeft: state => state.tabsleft,
  sideMenuList: state => state.sideMenuList,
  menuList: state => state.menuList,
  getTabsList: state => state.tabsList
}
// mutations
const mutations = {
  /**
   * 收起左侧菜单
   * @param{any}{commit, state}
   */
  CLOSE_SLIDEMENU (state) {
    state.sidemenuState = false
  },
  /**
   * 展开左侧菜单
   * @param{any}{commit, state}
   */
  OPEN_SLIDEMENU (state) {
    state.sidemenuState = true
  },
  /**
   * 移除左侧菜单(在没有左侧菜单的时候销毁左侧菜单)
   * @param{any}{commit, state}
   */
  REMOVE_SLIDEMENU (state) {
    state.sideMenuRender = false
    if (global.menuLevel === 2) {
      state.sideMenuRender = true
    }
  },
  /**
   * 渲染左侧菜单
   * @param{any}{commit, state}
   */
  RENDER_SLIDEMENU (state) {
    state.sideMenuRender = true
  },
  /**
   * 更新当前面包屑(左侧菜单渲染的时候生效)
   * @param{any}state
   * @param{any}path
   */
  UPDATE_BREADPATH (state, path) {
    state.breadpath = path
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
  // INCREAD_TABSLEFT (state, len) {
  //   state.tabsleft = state.tabsleft + len
  // },
  // DECREAD_TABSLEFT (state, len) {
  //   state.tabsleft = state.tabsleft - len
  // },
  // UPDATE_TABSLIST (state, w) {
  //   // state.tabsleft = -(parseInt(w) / 3)
  // },
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
   * 更新左侧菜单列表(点击顶部一级菜单时更新左侧菜单)
   * @param{any}state
   * @param{any}k
   */
  UPDATE_SIDE_MENU (state, k) {
    state.sideMenuList = [...k]
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
   * 更新当前展开菜单项(即有子集菜单的菜单项)
   * @param{any}state
   * @param{any}name
   */
  UPDATE_OPENNAMES (state, names) {
    state.currOpenNames = [...names]
    setStorage('local', 'sideMenu', state)
  },
  /**
   * 更新当前选中的系统(即在三级菜单模式的时候选中的一级菜单)
   * @param{any}state
   * @param{any}k
   */
  UPDATE_CURR_SYS (state, k) {
    state.currSys = k
    setStorage('local', 'sideMenu', state)
  }
}
// actions
const actions = {
  /**
   * 收起左侧菜单
   * @param{any}{commit, state}
   */
  closeSlidemenu ({commit, state}) {
    commit('CLOSE_SLIDEMENU')
  },
  /**
   * 展开左侧菜单
   * @param{any}{commit, state}
   */
  openSlidemenu ({commit, state}) {
    commit('OPEN_SLIDEMENU')
  },
  /**
   * 移除左侧菜单(在没有左侧菜单的时候销毁左侧菜单)
   * @param{any}{commit, state}
   */
  removeSlidemenu ({commit, state}) {
    commit('REMOVE_SLIDEMENU')
    commit('CLOSE_SLIDEMENU')
  },
  /**
   * 渲染左侧菜单
   * @param{any}{commit, state}
   */
  renderSlidemenu ({commit, state}) {
    commit('RENDER_SLIDEMENU')
    commit('OPEN_SLIDEMENU')
  },
  /**
   * 更新当前菜单展开项
   * @param{any}{commit, state}
   * @param{any}names
   */
  updateOpenNames ({commit, state}, names) {
    commit('UPDATE_OPENNAMES', names)
  },
  /**
   * 更新当前面包屑(左侧菜单渲染的时候生效)
   * @param{any}state
   * @param{any}path
   */
  updateBreadpath ({commit, state}, path) {
    commit('UPDATE_BREADPATH', path)
  },
  /**
   * 更新当前面包屑(左侧菜单销毁的时候生效)
   * @param{any}{commit, state}
   * @param{any}ob
   */
  updateSideMenuRenderBreakMenu ({commit, state}, ob) {
    commit('UPDATE_SIDE_MENU_RENDER_BREAKMENU', ob)
  },
  increadTabsleft ({commit, state}, len) {
    commit('INCREAD_TABSLEFT', len)
  },
  decreadTabsleft ({commit, state}, len) {
    commit('DECREAD_TABSLEFT', len)
  },
  updateTablist ({commit, state}, w) {
    commit('UPDATE_TABSLIST', w)
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
   * 添加菜单项(在系统初始化的时候储存菜单) ---- 请求异步时候
   * @param{any}state
   * @param{any}k
   */
  async pushAsyncMenuList ({ commit, state }) {
    if (Equal.isPromise(frameMenuPromise)) {
      let k = await frameMenuPromise
      commit('PUSH_MENU_LIST', k)
      if (global.menuLevel === 2) {
        commit('UPDATE_SIDE_MENU', k)
      }
    }
  },
  /**
   * 添加菜单项(在系统初始化的时候储存菜单) ---- 同步时候
   * @param{any}state
   * @param{any}k
   */
  pushMenuList ({ commit, state }) {
    let k = frameMenu
    commit('PUSH_MENU_LIST', k)
    if (global.menuLevel === 2) {
      commit('UPDATE_SIDE_MENU', k)
    }
  },
  /**
   * 更新左侧菜单列表(点击顶部一级菜单时更新左侧菜单)
   * @param{any}state
   * @param{any}k
   */
  updateSideMenu ({ commit, state }, k) {
    commit('UPDATE_SIDE_MENU', k)
    if (k.length > 0) {
      commit('RENDER_SLIDEMENU')
    }
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
   * 更新当前选中的系统(即在三级菜单模式的时候选中的一级菜单)
   * @param{any}state
   * @param{any}k
   */
  updateCurrSys ({commit, state}, k) {
    commit('UPDATE_CURR_SYS', k)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
