/*
 * @Author: ChaoLeer
 * @Date: 2017-12-15 15:32:30
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-12-15 16:37:45
 * @Description: 左侧导航菜单
 */
<template>
  <el-menu default-active="1-4-1" class="lady-aside" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <li class="lady-aside-bar" @click="toggleAsideHandler" >
      <el-icon :class="collapseBarIcon"></el-icon>
    </li>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航一</span>
      </template>
      <el-menu-item-group>
        <span slot="title">分组一</span>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-setting"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    data () {
      return {
        isCollapse: true
      }
    },
    computed: {
      collapseBarIcon: function () {
        let vm = this
        let direction = vm.isCollapse ? 'right' : 'left'
        return `el-icon-d-arrow-${direction}`
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      // 展开收缩菜单
      toggleAsideHandler () {
        let vm = this
        console.info('点击展开')
        vm.isCollapse = !vm.isCollapse
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
