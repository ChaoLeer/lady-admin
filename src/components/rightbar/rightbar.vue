/*
 * @Author: ChaoLeer
 * @Date: 2017-12-04 15:09:54
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-12-15 17:23:18
 * @Description: app 头部右部分
 */
<template>
  <div class="lady-rightbar">
    <el-dropdown>
      <span class="el-dropdown-link">
        <img class="user-photo" src="../../assets/logo.png" alt="user">
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
        
  </div>
</template>

<style lang="scss" scoped>
  .lady-logo {
    .lady-icon {
      line-height: 60px;
      font-size: 38px;
      color: #009688;
    }
  }
</style>