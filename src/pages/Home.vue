<template>
  <h2>home页面</h2>
</template>

<script>
  import LadyLogo from '@/components/logo/logo.vue'
  import LadyAside from '@/components/aside/aside.vue'
  import LadyCollapse from '@/components/collapse/collapse.vue'
  import LadyRightbar from '@/components/rightbar/rightbar.vue'
  export default {
    name: 'LadyApp',
    components: {
      LadyLogo,
      LadyAside,
      LadyRightbar,
      LadyCollapse
    },
    data () {
      return {
        backTopStatus: false,
        isScroll: false
      }
    }
  }
</script>

<style lang="scss">
</style>