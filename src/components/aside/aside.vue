/*
 * @Author: ChaoLeer
 * @Date: 2017-12-15 15:32:30
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-12-15 16:37:45
 * @Description: 左侧导航菜单
 */
 <template>
    <!-- @select="menuSelectHandler" -->
  <el-menu ref="ladyMenu" router unique-opened
    :default-active="ladyDefaultActive"
    class="lady-aside" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <!-- <li class="lady-aside-bar" @click="toggleAsideHandler" >
      <el-icon :class="collapseBarIcon"></el-icon>
    </li> -->
    <slot></slot>
    <template v-for="(item,index) in menuList">
      <el-menu-item v-if="item.only" :index="item.menuurl" :key="index" @click.native="menuSelectHandler(item)">
        <i class="fa " :class="item.iconCls"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
      <el-submenu v-else :index="JSON.stringify(item)" :key="index">
        <template slot="title">
          <i class="fa " :class="item.iconCls"></i>
          <span slot="title">{{item.title}}</span>
        </template>
        <el-menu-item v-for="child,childIndex in item.children" :key="childIndex" :index="child.menuurl" @click.native="menuSelectHandler(child)">
          <i class="fa " :class="child.iconCls"></i>
          <span slot="title">{{child.title}}</span>
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    data () {
      return {
        // isCollapse: false,
        // ladyBreadcrumbRoot: {},
        ladyDefaultOpeneds: ''
      }
    },
    computed: {
      ...mapState({
        isCollapse: state => state.sidemenu.collapseState,
        menuList: state => state.sidemenu.menuList
      }),
      collapseBarIcon: function () {
        let vm = this
        let direction = vm.isCollapse ? 'right' : 'left'
        return `el-icon-d-arrow-${direction}`
      },
      ladyDefaultActive: function () {
        let vm = this
        return vm.initLadyMenu()
      }
    },
    watch: {
      isCollapse: function (val, oldVal) {
        let vm = this
        if (oldVal) {
          vm.initLadyMenu()
          if (vm.ladyDefaultOpeneds) {
            vm.$refs.ladyMenu.open(vm.ladyDefaultOpeneds || '')
          }
        }
      }
    },
    created () {
      let vm = this
      vm.getLadyMenuData()
    },
    methods: {
      ...mapActions(['addTab', 'updateBreadpath']),
      getLadyMenuData: function () {
        let vm = this
        // vm.menuList = menuList.pageconfig
        setTimeout(function () {
          // [{
          //   only: true,
          //   menuurl: 'test1',
          //   iconCls: 'fa fa-edit',
          //   title: '测试1'
          // }, {
          //   iconCls: 'fa fa-user',
          //   title: '测试2',
          //   children: [{
          //     menuurl: 'test21',
          //     iconCls: 'fa fa-edit',
          //     title: '测试2-1'
          //   }]
          // }, {
          //   iconCls: 'fa fa-home',
          //   title: '测试3',
          //   children: [{
          //     menuurl: 'test31',
          //     iconCls: 'fa fa-edit',
          //     title: '测试3-1'
          //   }, {
          //     menuurl: 'test32',
          //     iconCls: 'fa fa-user',
          //     title: '测试3-2'
          //   }]
          // }]
          vm.$nextTick(function () {
            vm.initLadyMenu()
            if (vm.ladyDefaultOpeneds) {
              vm.$refs.ladyMenu.open(vm.ladyDefaultOpeneds || '')
            }
          })
        }, 3000)
      },
      initLadyMenu: function () {
        let vm = this
        let menuurl = vm.$route.path.split('/')[1]
        vm.findParentMenu(menuurl)
        return menuurl
      },
      findParentMenu: function (menuurl) {
        let vm = this
        for (let i = 0; i < vm.menuList.length; i++) {
          if (vm.menuList[i].children) {
            let tmpArr = []
            vm.menuList[i].children.forEach(citm => {
              if (citm.menuurl === menuurl) {
                tmpArr.push(citm)
                vm.updateBreadpath({
                  root: {...vm.menuList[i]},
                  curr: [citm],
                  menuurl: menuurl
                })
              }
            })
            if (tmpArr.length > 0) {
              vm.ladyDefaultOpeneds = JSON.stringify(vm.menuList[i])
              // break
            }
          } else {
            if (vm.menuList[i].menuurl === menuurl) {
              // console.info('...........')
              vm.updateBreadpath({
                root: {...vm.menuList[i]},
                curr: [],
                menuurl: menuurl
              })
            }
          }
        }
      },
      handleOpen (key, keyPath) {
      },
      handleClose (key, keyPath) {
      },
      // 展开收缩菜单
      toggleAsideHandler () {
        let vm = this
        vm.isCollapse = !vm.isCollapse
        if (!vm.isCollapse && vm.menuList.length > 0 && vm.ladyDefaultOpeneds) {
          vm.$refs.ladyMenu.open(vm.ladyDefaultOpeneds || '')
        }
      },
      menuSelectHandler (item) {
        let vm = this
        let tab = {
          menuid: item.name,
          menuurl: item.menuurl,
          name: item.title
        }
        vm.addTab(tab)
      }
    }
  }
</script>

<style class="scss" scoped>
  .lady-aside {
    /* transition: width .25s ease-in-out; */
  }
  .lady-aside:not(.el-menu--collapse) {
    /* min-width: 40px; */
    width: 200px;
    min-height: 400px;
  }
  .lady-aside-bar{
    cursor: pointer;
    text-align: center;
    line-height: 32px;
  }
</style>
