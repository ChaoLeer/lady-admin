<template>
  <div class="vue-tabs">
    <div class="tabs-list-wrapper">
      <div class="tabs-wrapper-top">
        <div class='tabs-list-box'>
          <ul class="tabs-list" ref="tabsListCont" v-bind:style="{left: tableft + 'px'}">
            <tab v-for="tab in tabs" :tab-data="tab" @close="close(tab)" @click.native="clickTab(tab)"></tab>
          </ul>
        </div>
        <div class="tabs-control">
          <span class="tabs-control-btn" v-on:click="tabLeft">
            <i class="fa fa-angle-left"></i>
          </span>
          <span class="tabs-control-btn" v-on:click="tabRight">
            <i class="fa fa-angle-right"></i>
          </span>
        </div>
      </div>
  
      <div class="breadcrumbs-bar">
        <span v-html='breadpath' class="breadcrumbs"></span>
        <Button type='text' v-on:click="refreshTabsContent">
          <i class="fa fa-refresh"></i>
        </Button>
      </div>
    </div>
    <div class="tabs-content-wrapper" ref="contentWrapEl">
    </div>
  </div>
</template>
<script>
import { isFunction, isString, isObject, store, consts, DispatchResize } from '../js/utils'
import Tab from './Tab.vue'
import { mapState, mapActions } from 'vuex'

function tabIdGen (tabName, tabKey = '') {
  if (isObject(tabName)) {
    const { name, key = '' } = tabName
    return `${name}/${key}`
  }
  return `${tabName}/${tabKey}`
}
const EVENT_ACTIVE_CHANGE = 'vue-tabs-active-change'
const EVENT_CLOSE = 'vue-tabs-close'
const cached = {}
export default {
  name: 'framTaber',
  components: { Tab },
  data () {
    return {
      refresh: true,
      tabs: [],
      active: null
    }
  },
  beforeCreate () {
  },
  created () {
    this.tabSize = 0
    this.tabMap = {}
    this.$taber.vm = this
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    breadpath: state => state.slidemenu.breadpath,
    tableft: state => state.slidemenu.tabsleft
  }),
  mounted () {
    this.$taber.mounted()
  },
  methods: {
    ...mapActions([
      'increadTabsleft',
      'decreadTabsleft',
      'chooseCurrent',
      'updateTablist'
    ]),
    appendContent (tab) {
      let Component = cached[tab.name]
      const _this = this
      let promise
      // console.info(_this.$refs.tabsListCont.scrollWidth)
      _this.updateTablist(_this.$refs.tabsListCont.scrollWidth)
      if (!Component) {
        if (isFunction(tab.meta.component)) {
          const asyncFn = tab.meta.component
          this.$set(tab, 'loading', true)
          promise = new Promise(asyncFn).then((Component) => {
            return (cached[tab.name] = _this.getVue().extend(Component))
          })
        } else {
          promise = Promise.resolve(tab.meta.component).then((Component) => {
            return (cached[tab.name] = _this.getVue().extend(Component))
          })
        }
      } else {
        promise = Promise.resolve(Component)
      }

      const $el = document.createElement('div')
      _this.$refs.contentWrapEl.appendChild($el)
      $el.classList.add('tabs-content')
      // $el.className = 'tabs-content active'
      // $el.classList.add('active')

      promise.then((Component) => {
        newInstance(Component, $el)
      })

      return promise

      function newInstance (Component, $el) {
        const instance = new Component({
          el: $el,
          __taber: _this.$taber,
          parent: _this,
          $tab: tab
        })
        tab.content = instance
        // instance.$el.classList.add('tabs-content')
      }
    },
    clickTab (tab) {
      console.info(tab)
      if (tab && !tab.active) {
        this.select(tab)
      }
      this.chooseCurrent({
        id: '',
        type: '',
        url: '',
        tabledate: null
      })
      DispatchResize()
    },
    close (tab) {
      this.chooseCurrent({
        id: '',
        type: '',
        url: '',
        tabledate: null
      })
      if (!tab) {
        return
      }
      DispatchResize()
      const hooks = [...this.$taber.beforeCloseHooks]
      if (tab.meta.beforeClose && isFunction(tab.meta.beforeClose)) {
        hooks.push(tab.meta.beforeClose)
      }
      hooks.push(_close)
      let i = 0
      const _this = this
      function next (target) {
        if (target == null) {
          hooks[++i].call(_this, tab, next)
        } else if (target === false) {
          return
        }
      }
      hooks[0].call(_this, tab, next)

      function _close () {
        tab.content.$destroy()
        tab.content.$el.remove()
        this.tabMap[tabIdGen(tab)] = null
        const index = this.tabs.indexOf(tab)
        if (index === -1) {
          return
        }
        this.tabs.splice(index, 1)

        if (this.tabs.length > 0 && this.active === tab) {
          if (index < this.tabs.length) {
            this.select(this.tabs[index])
          } else {
            this.select(this.tabs[this.tabs.length - 1])
          }
        } else if (this.tabs.length === 0) {
          this.$emit(EVENT_ACTIVE_CHANGE, null, tab)
          this._saveTabs()
        }
        this.$emit(EVENT_CLOSE, tab)
      }
      global.tabslength = _this.tabs.length
    },
    create (tab, rfsh) {
      this.chooseCurrent({
        id: '',
        type: '',
        url: '',
        tabledate: null
      })
      let hooks = [...this.$taber.beforeCreateHooks]
      if (tab.meta.beforeCreate && isFunction(tab.meta.beforeCreate)) {
        hooks.push(tab.meta.beforeCreate)
      }
      let i = 0
      let _this = this
      let next = function (target) {
        if (target == null) {
          hooks[++i].call(_this, tab, next)
        } else if (target === false) {
          return
        } else {
          if (isString(target) && target === tab.name) {
            hooks[++i].call(_this, tab, next)
          } else if (isObject(target) && target.name === tab.name) {
            hooks[++i].call(_this, tab, next)
          } else {
            _this.$taber.open(target)
          }
        }
      }
      hooks.push(() => {
        if (rfsh) { } else {
          this.tabs.splice(1, 0, tab)
        }
        const p = this.appendContent(tab).then(() => {
          this.$set(tab, 'loading', false)
        })
        tab.promise = p
        if (tab.active !== false) {
          this.select(tab)
        } else {
          this._saveTabs()
        }
        const id = tabIdGen(tab.name, tab.key)
        this.tabMap[id] = tab

        next = null
        hooks = null
      })

      hooks[0].call(this, tab, next)
      global.tabslength = _this.tabs.length
    },
    findOpenTab (name, key) {
      const id = tabIdGen(name, key)
      return this.tabMap[id]
    },
    select (tab) {
      this.chooseCurrent({
        id: '',
        type: '',
        url: '',
        tabledate: null
      })
      if (!tab) {
        return
      }
      if (tab.active && tab.content) {
        tab.content.$el.classList.add('active')
      }
      this.$set(tab, 'active', true)
      this.$emit(EVENT_ACTIVE_CHANGE, tab, this.active)
      this.active = tab
      this.tabs.forEach((ftab) => {
        if (tabIdGen(ftab.name, ftab.key) !== tabIdGen(tab.name, tab.key)) {
          this.$set(ftab, 'active', false)
          if (ftab.content && ftab.content.$el) {
            ftab.content.$el.classList.add('tabs-content')
            ftab.content.$el.classList.remove('active')
          }
        }
      })
      this._saveTabs()
      let promise = tab.promise
      if (!promise) {
        promise = Promise.resolve()
      }
      promise.then(() => {
        if (tab.active && tab.content) {
          tab.content.$el.classList.add('active')
          tab.promise = null
        }
      })
    },
    _saveTabs () {
      if (!this.$taber.persist) {
        return
      }
      const toSave = this.tabs.map((v) => {
        return {
          name: v.name,
          key: v.key,
          params: v.params,
          active: v.active
        }
      })
      store.save(consts.STORE_KEY, toSave)
    },
    tabLeft () {
      const vm = this
      // console.log(vm.tableft)
      if (vm.tableft < 0) {
        vm.increadTabsleft(60)
      }
    },
    tabRight () {
      const vm = this
      // console.log(vm)
      vm.decreadTabsleft(60)
      // console.log(vm.tableft)
    },
    refreshTabsContent () {
      const vm = this
      vm.$Message.info('重新加载中...')
      let current = vm.active
      vm.$children.forEach(function (item) {
        // console.info(item)
        if (item.$el.className.indexOf('active') >= 0 && item.$el.localName === 'div') {
          item.$destroy()
          item.$el.remove()
          setTimeout(function () {
            // console.log(current)
            vm.create(current, true)
          }, 300)
        }
      })
    }
  }
}

</script>
<style lang="scss">
.vue-tabs {
  position: relative;
}

.tabs-list-wrapper {
  padding: 0px 8px;
  background: #f5f5f5;
}

@keyframes loading-rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loading-rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.tabs-list {
  list-style: none;
  margin: 0px;
  padding: 0px;
  overflow: auto;
  width: auto;
  zoom: 1;
  >li {
    float: left;
    padding: 6px 18px;
    position: relative;
    color: #999;
    &.loading:before {
      content: ' ';
      box-sizing: border-box;
      display: inline-block;
      width: 14px;
      height: 14px;
      position: absolute;
      left: 0px;
      top: 10px;
      border-radius: 9px;
      border: 2px solid #1ab394;
      border-top-color: transparent;
      border-left-color: transparent;
      animation: loading-rotate .8s infinite linear;
      -webkit-animation: loading-rotate .8s infinite linear;
    }
    &.active {
      color: #333;
      &:after {
        content: ' ';
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 2px;
        background-color: none;
        left: 0px;
      }
      .btn-close {
        opacity: 1;
      }
    }
    &:hover {
      cursor: pointer;
      .btn-close {
        opacity: 1;
      }
    }
    .btn-close {
      position: absolute;
      display: inline-block;
      opacity: 0;
      top: 2px;
      right: 0px;
      line-height: 12px;
      text-align: center;
      width: 14px;
      height: 14px;
      border-radius: 14px;
      font-size: 12px;
      color: #999;
      transition: all 0.2s ease;
      &:hover {
        color: #333;
        transform: scale(1.2);
        cursor: pointer;
      }
    }
  }
}

.breadcrumbs-bar {
  position: relative;
  .breadcrumbs {
    display: inline-block;
    width: 100%;
    padding: 10px 20px;
    border-bottom: 1px #cdd2d2 solid;
    color: #333;
    font-size: 14px;
  }
  .ivu-btn {
    position: absolute;
    right: 20px;
    top: 0;
  }
}
</style>
