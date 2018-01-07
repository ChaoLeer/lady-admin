/*
 * @Author: ChaoLeer
 * @Date: 2017-10-24 16:05:13
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-10-25 10:26:00
 * @Description: tabs框架状态管理
 */
import {setStorage, getStorageValue} from '@/framework/common/storage'
const state = {
  tabsActive: getStorageValue('local', 'tabsStorage').tabsActive || '',
  tabsList: getStorageValue('local', 'tabsStorage').tabsList || [],
  distabs: ''
}

const getters = {}

const actions = {
  /**
   * 更新tabs active项
   * @param {any} {commit, state}
   * @param {String} b
   */
  updateTabsActive ({commit, state}, b) {
    commit('UPDATE_TABS_ACTIVE', b)
  },
  /**
   * 更新tabs active项
   * @param {any} {commit, state}
   * @param {Object} a
   */
  updateTabsList ({commit, state}, menuitem) {
    let flg = state.tabsList.filter(function (itm) {
      return menuitem.menuurl === itm.menuurl
    })
    if (flg.length > 0) {
      // state.tabsList()
      commit('REMOVE_TAB', flg[0].menuurl)
      // state.tabsList.unshift(flg[0])
      // enableAdd = false
    }
    commit('UPDATE_TABS_LIST', menuitem)
  },
  /**
   * 移除tabs
   * @param {any} {commit, state}
   */
  removeTab ({commit, state}, menuurl, callback) {
    if (state.distabs === menuurl) {
      return true
    } else {
      commit('REMOVE_TAB', menuurl)
      commit('UPDATE_TABS_ACTIVE', state.tabsList[0].menuurl)
      return false
    }
  },
  /**
   * 移除所有tabs项
   * @param {any} {commit, state}
   */
  removeAllTabs ({commit, state}) {
    let arr = []
    state.tabsList.forEach(function (tabItem) {
      if (state.distabs === tabItem.menuurl) {
        arr.push(tabItem)
      }
    })
    commit('UPDATE_CURR_MENU', `/${state.distabs}`)
    commit('REMOVE_ALL_TABS', arr)
    commit('UPDATE_TABS_ACTIVE', state.tabsList[0].menuurl)
  },
  /**
   * 移除tabs其他项
   * @param {any} {commit, state}
   */
  removeOtherTabs ({commit, state}) {
    commit('REMOVE_OTHER_TABS')
  },
  /**
   * 设置tabs不可关闭项
   * @param {any} {commit, state}
   * @param {String} menuurl 菜单的menuurl
   */
  setDisCloseTabs ({commit, state}, menuurl) {
    if (state.tabsList.length < 1) {
      console.info(menuurl)
      commit('UPDATE_TABS_ACTIVE', menuurl)
    }
    commit('SET_DIS_CLOSE_TABS', menuurl)
  }
}

const mutations = {
  /**
   * 更新tabs active项
   * @param {any} state
   * @param {String} b
   */
  UPDATE_TABS_ACTIVE (state, menuurl) {
    state.tabsActive = menuurl
    setStorage('local', 'tabsStorage', state)
  },
  /**
   * 更新tabs active项
   * @param {any} state
   * @param {Object} a
   */
  UPDATE_TABS_LIST (state, menuitem) {
    console.info('***tabs-list开始更新***')
    console.info(menuitem)
    state.tabsList.unshift(menuitem)
    console.info(state)
    setStorage('local', 'tabsStorage', state)
    console.info(state)
    console.info('***tabs-list更新完成***')
  },
  /**
   * 移除tabs
   * @param {any} state
   */
  REMOVE_TAB (state, menuurl) {
    console.info('***移除tabs开始***')
    state.tabsList = state.tabsList.filter(function (itm) {
      return menuurl !== itm.menuurl
    })
    setStorage('local', 'tabsStorage', state)
    console.info('***移除tabs完成***')
  },
  /**
   * 移除所有tabs项
   * @param {any} state
   */
  REMOVE_ALL_TABS (state, arr) {
    state.tabsList = [...arr]
    setStorage('local', 'tabsStorage', state)
  },
  /**
   * 移除tabs其他项
   * @param {any} state
   */
  REMOVE_OTHER_TABS (state) {
    console.info(state.tabsActive)
  },
  /**
   * 设置tabs不可关闭项
   * @param {any} state
   * @param {Object} da
   */
  SET_DIS_CLOSE_TABS (state, menuurl) {
    state.distabs = menuurl
    setStorage('local', 'tabsStorage', state)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
