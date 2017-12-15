<template>
  <div id="app">
    <el-container>
      <el-header class="lady-header">
        <lady-logo></lady-logo>
        <lady-rightbar></lady-rightbar>
      </el-header>
      <el-container>
        <div class="lady-aside-container">
          <lady-aside></lady-aside>
        </div>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import LadyLogo from './components/logo/logo.vue'
  import LadyAside from './components/aside/aside.vue'
  import LadyRightbar from './components/rightbar/rightbar.vue'
  export default {
    name: 'LadyApp',
    components: {
      LadyLogo,
      LadyAside,
      LadyRightbar
    }
  }
</script>

<style lang="scss">
  @import "assets/stylesheet/index.scss";
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .lady-aside-container{
      position: fixed;
      top: 60px;
      left: 0;
      height: 100%;
      width: auto;
      overflow-y: audo;
    }
    .lady-aside {
      height: 100%;
    }
  }
</style>
