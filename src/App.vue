<template>
  <div id="app">
    <router-view v-if="isAccess"></router-view>
    <div v-else class="lady-welcome">
      <div style="font-size: 30px;margin-top: 80px;text-align: center;">
        欢迎使用lady前端admin后台管理系统
        <p><small>正在验证您的访问权限...</small></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LadyApp',
    data () {
      return {
        isAccess: false
      }
    },
    created () {
      let vm = this
      // 验证权限
      // 获取菜单
      setTimeout(function () {
        vm.isAccess = true
        console.info(vm.$route.path)
        vm.$router.push(vm.$route.path)
      }, 3000)
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
</style>
