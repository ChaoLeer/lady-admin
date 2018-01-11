/*
 * @Author: ChaoLeer
 * @Date: 2017-12-04 15:09:54
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-12-04 15:34:51
 * @Description: app logo
 */
<template>
  <div class="lady-logo">
    <i class="lady-icon lady-icon-lady"></i>
    <h1 v-if="!isCollapse" class="lady-appname">LADY管理系统</h1>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState({
        isCollapse: state => state.sidemenu.collapseState
      })
    }
  }
</script>

<style lang="scss" scoped>
  .lady-logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
    .lady-icon {
      line-height: 60px;
      font-size: 38px;
      color: #009688;
    }
    .lady-appname{
      white-space: nowrap;
      margin-left: 6px;
      font-size: 18px;
    }
  }
</style>