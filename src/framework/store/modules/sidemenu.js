import {setStorage, getStorageValue} from '@/framework/common/storage'
// import { Equal } from '@/framework/utils'

// states
const state = {
  collapseState: false,
  menuList: getStorageValue('local', 'sideMenu').menuList || []
}

// getters
const getters = {
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
   * 更新当前面包屑(左侧菜单渲染的时候生效)
   * @param{any}state
   * @param{any}path
   */
  updateBreadpath ({commit, state}, path) {
    commit('UPDATE_BREADPATH', path)
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
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
