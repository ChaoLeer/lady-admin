<template>
  <div id="app">
    <div v-if="!isAccess" class="lady-welcome">
      <div style="font-size: 30px;margin-top: 80px;text-align: center;">
        欢迎使用lady前端admin后台管理系统
        <p><small>正在验证您的访问权限...</small></p>
      </div>
    </div>
    <template v-if="isAccess">
      <el-container>
        <lady-aside>
          <lady-logo></lady-logo>
        </lady-aside>
        <el-container>
          <el-header class="lady-header">
            <lady-collapse></lady-collapse>
            <div class="lady-header__inner">
              <el-breadcrumb v-if="breadcrumbRoot" class="lady-breadcrumb" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' + breadcrumbRoot.menuurl }">{{breadcrumbRoot.title}}</el-breadcrumb-item>
                <el-breadcrumb-item v-for="bc,index in breadcrumbRoot.children" :key="index" :to="{ path: '/' + bc.menuurl }">{{bc.title}}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <lady-rightbar></lady-rightbar>
          </el-header>
          <el-main class="lady-main" id="ladyMain">
            <!-- <div class="lady-tabs-container"> -->
              <div class="lady-tabs-wrapper" :class="{'is-scroll': isScroll}" v-if="ladyTabs.length > 0" ref="ladyTabs">
                <el-button @click="tabsHandler('prev')" type="text" class="el-tabs__nav-prev">
                  <i class="el-icon-arrow-left"></i>
                </el-button>
                <el-button @click="tabsHandler('next')" type="text" class="el-tabs__nav-next">
                  <i class="el-icon-arrow-right"></i>
                </el-button>
                <span ref="ladyTabsList" class="lady-tabs-list">
                  <el-tag
                    v-for="tab,idx in ladyTabs"
                    size="medium"
                    :key="idx"
                    :closable="ladyTabs.length > 1"
                    @close="closeTab(tab)"
                    @click.native="selectTab(tab)"
                    :type="tab.menuurl === $route.path.split('/')[1] ? '' : 'info'">
                    {{tab.name}}
                  </el-tag>
                </span>
              </div>
            <!-- </div> -->
            <!-- {{currRouterPath}} -->
            <div class="lady-main-inner">
              <transition mode="out-in"  enter-active-class="zoomIn" leave-active-class="zoomOut">
                <router-view class="animated"></router-view>
              </transition>
            </div>
            <transition mode="out-in"  enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
              <div v-if="backTopStatus" class="backtop animated" @click="backTop">
                <i class="fa fa-arrow-up fa-2x" aria-hidden="true"></i>
              </div>
            </transition>
          </el-main>
        </el-container>
      </el-container>
    </template>
  </div>
</template>

<script>
  import menuList from '@/conifg'
  import LadyLogo from '@/components/logo/logo.vue'
  import LadyAside from '@/components/aside/aside.vue'
  import LadyCollapse from '@/components/collapse/collapse.vue'
  import LadyRightbar from '@/components/rightbar/rightbar.vue'
  import {mapState, mapActions} from 'vuex'
  var ct = null
  export default {
    name: 'LadyApp',
    data () {
      return {
        backTopStatus: false,
        isScroll: false,
        isAccess: false
      }
    },
    components: {
      LadyLogo,
      LadyAside,
      LadyRightbar,
      LadyCollapse
    },
    created () {
      let vm = this
      // 验证权限
      vm.initMenuList(menuList.pageconfig)
      // 获取菜单
      setTimeout(function () {
        vm.isAccess = true
        // 初始化系统
        vm.initAppMain()
        vm.$router.push(vm.$route.path)
      }, 3000)
    },
    computed: {
      ...mapState({
        ladyTabs: state => state.sidemenu.tabsList,
        isCollapse: state => state.sidemenu.collapseState,
        breadcrumbRoot: state => state.sidemenu.breadcrumbRoot
      }),
      currRouterPath: function () {
        let vm = this
        return vm.$route.path.split('/')[1]
      }
      // ...mapGetters(['ladyTabs'])
    },
    watch: {
      currRouterPath: function (val) {
        let vm = this
        if (vm.$refs.ladyTabs) {
          let ladyTabsWidth = vm.$refs.ladyTabs.offsetWidth
          let ladyTabsListWidth = vm.$refs.ladyTabsList.offsetWidth
          vm.$refs.ladyTabsList.style.left = 18
          vm.isScroll = ladyTabsWidth < ladyTabsListWidth
        }
      },
      isCollapse: function (val) {
        let vm = this
        setTimeout(function () {
          vm.$nextTick(function () {
            vm.tabsHandler('prev')
          })
        }, 500)
      }
    },
    methods: {
      ...mapActions(['deleteTab', 'addTab', 'initMenuList']),
      initAppMain: function () {
        let vm = this
        vm.$nextTick(function () {
          let $cont = document.getElementById('ladyMain')
          $cont.onscroll = function () {
            vm.backTopStatus = $cont.scrollTop > 100
          }
          vm.tabsHandler('prev')
        })
      },
      backTop: function () {
        let vm = this
        vm.$nextTick(function () {
          vm.animatBackTop()
        })
      },
      animatBackTop: function () {
        let vm = this
        // let $cont = document.getElementById('climbcon')
        console.info(document.documentElement.scrollTop)
        let $cont = document.getElementById('ladyMain')
        if ($cont.scrollTop - 80 <= 0) {
          $cont.scrollTop = 0
          clearTimeout(ct)
          return false
        } else {
          $cont.scrollTop = $cont.scrollTop - 80
        }
        ct = setTimeout(vm.animatBackTop, 10)
      },
      closeTab: function (tab) {
        let vm = this
        vm.deleteTab(tab)
        if (tab.menuurl === vm.currRouterPath) {
          console.info(vm.ladyTabs[0])
          vm.$router.push('/' + vm.ladyTabs[0].menuurl)
        }
      },
      selectTab: function (tab) {
        let vm = this
        vm.addTab(tab)
        vm.$refs.ladyTabsList.style.transform = `translateX(0px)`
        vm.$router.push('/' + tab.menuurl)
      },
      tabsHandler: function (dir) {
        let vm = this
        if (vm.$refs.ladyTabs) {
          let ladyTabsEle = vm.$refs.ladyTabs
          let ladyTabsListEle = vm.$refs.ladyTabsList
          let ladyTabsWidth = ladyTabsEle.offsetWidth
          let ladyTabsListWidth = ladyTabsListEle.offsetWidth
          if (dir === 'prev') {
            ladyTabsListEle.style.transform = `translateX(0px)`
          }
          if (dir === 'next') {
            ladyTabsListEle.style.transform = `translateX(-${ladyTabsWidth / 2}px)`
          }
          vm.isScroll = ladyTabsWidth < ladyTabsListWidth
        }
      }
    },
    mounted () {
    }
  }
</script>

<style lang="scss">
  @import "assets/stylesheet/index.scss";
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    display: flex;
    .lady-aside-container{
      position: fixed;
      top: 60px;
      left: 0;
      height: 100%;
      width: auto;
      /* overflow-y: auto; */
    }
    .lady-aside {
      height: 100%;
      /* overflow-y: auto; */
    }
  }
  .lady-welcome{
    flex: 1;
  }
  .lady-aside-container {
    position: fixed;
    top: 60px;
    left: 0;
    height: 100%;
    width: auto;
    /* overflow-y: auto; */
  }
  .lady-aside {
    height: 100%;
    /* overflow-y: auto; */
  }
</style>
