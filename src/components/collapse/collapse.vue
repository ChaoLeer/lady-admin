<template>
  <span class="lady-sidebar-btn" @click="toggleAsideHandler">
    <i class="fa fa-bars"></i>
  </span>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  export default {
    computed: {
      ...mapState({
        isCollapse: state => state.sidemenu.collapseState
      })
    },
    methods: {
      ...mapActions(['openSlidemenu', 'collapseSlidemenu']),
      // 展开收缩菜单
      toggleAsideHandler () {
        let vm = this
        // vm.isCollapse = !vm.isCollapse
        if (vm.isCollapse) {
          vm.collapseSlidemenu()
        } else {
          vm.openSlidemenu()
        }
        // if (!vm.isCollapse && vm.menuList.length > 0 && vm.ladyDefaultOpeneds) {
        //   vm.$refs.ladyMenu.open(vm.ladyDefaultOpeneds || '')
        // }
      }
    }
  }
</script>

<style>
  .lady-sidebar-btn{
    display: inline-block;
    width: 50px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 22px;
  }
</style>
