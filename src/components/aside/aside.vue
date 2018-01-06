/*
 * @Author: ChaoLeer
 * @Date: 2017-12-15 15:32:30
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-12-15 16:37:45
 * @Description: 左侧导航菜单
 */
<template>
  <el-menu ref="ladyMenu" router unique-opened
    :default-active="ladyDefaultActive"
    class="lady-aside" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <li class="lady-aside-bar" @click="toggleAsideHandler" >
      <el-icon :class="collapseBarIcon"></el-icon>
    </li>
    <template v-for="(item,index) in menuList">
      <el-menu-item v-if="item.only" :index="item.menuurl" :key="index">
        <i class="fa " :class="item.iconCls"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
      <el-submenu v-else :index="JSON.stringify(item)" :key="index">
        <template slot="title">
          <i class="fa " :class="item.iconCls"></i>
          <span slot="title">{{item.title}}</span>
        </template>
        <el-menu-item v-for="child,childIndex in item.children" :key="childIndex" :index="child.menuurl">
          <i class="fa " :class="child.iconCls"></i>
          <span slot="title">{{child.title}}</span>
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
  export default {
    data () {
      return {
        isCollapse: false,
        menuList: [],
        ladyDefaultOpeneds: ''
      }
    },
    computed: {
      collapseBarIcon: function () {
        let vm = this
        let direction = vm.isCollapse ? 'right' : 'left'
        return `el-icon-d-arrow-${direction}`
      },
      ladyDefaultActive: function () {
        let vm = this
        console.info(vm.$route)
        return vm.initLadyMenu()
      }
    },
    watch: {
      isCollapse: function (val, oldVal) {
        let vm = this
        if (oldVal) {
          vm.initLadyMenu()
        }
      }
    },
    created () {
      let vm = this
      vm.getLadyMenuData()
    },
    methods: {
      getLadyMenuData: function () {
        let vm = this
        setTimeout(function () {
          vm.menuList = [{
            only: true,
            menuurl: 'test1',
            iconCls: 'fa fa-edit',
            title: '测试1'
          }, {
            iconCls: 'fa fa-user',
            title: '测试2',
            children: [{
              menuurl: 'test21',
              iconCls: 'fa fa-edit',
              title: '测试2-1'
            }]
          }, {
            iconCls: 'fa fa-home',
            title: '测试3',
            children: [{
              menuurl: 'test31',
              iconCls: 'fa fa-edit',
              title: '测试3-1'
            }, {
              menuurl: 'test32',
              iconCls: 'fa fa-user',
              title: '测试3-2'
            }]
          }]
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
              }
            })
            if (tmpArr.length > 0) {
              vm.ladyDefaultOpeneds = JSON.stringify(vm.menuList[i])
              break
            }
          }
        }
      },
      handleOpen (key, keyPath) {
        console.log(key)
        console.info(keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      // 展开收缩菜单
      toggleAsideHandler () {
        let vm = this
        vm.isCollapse = !vm.isCollapse
        if (!vm.isCollapse && vm.menuList.length > 0 && vm.ladyDefaultOpeneds) {
          vm.$refs.ladyMenu.open(vm.ladyDefaultOpeneds || '')
        }
      }
    }
  }
</script>

<style class="scss" scoped>
  .lady-aside:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .lady-aside-bar{
    cursor: pointer;
    text-align: center;
    line-height: 32px;
  }
</style>
