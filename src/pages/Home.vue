<template>
  <el-container>
    <!-- <div class="lady-aside-container">
    </div> -->
    <lady-aside>
      <lady-logo></lady-logo>
    </lady-aside>
    <el-container>
      <el-header class="lady-header">
        <lady-collapse></lady-collapse>
        <lady-rightbar></lady-rightbar>
      </el-header>
      <el-main id="ladyMain">
        <transition mode="out-in"  enter-active-class="zoomIn" leave-active-class="zoomOut">
          <router-view class="animated"></router-view>
        </transition>
        <transition mode="out-in"  enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
          <div v-if="backTopStatus" class="backtop animated" @click="backTop">
            <i class="fa fa-arrow-up fa-2x" aria-hidden="true"></i>
          </div>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import LadyLogo from '@/components/logo/logo.vue'
  import LadyAside from '@/components/aside/aside.vue'
  import LadyCollapse from '@/components/collapse/collapse.vue'
  import LadyRightbar from '@/components/rightbar/rightbar.vue'
  var ct = null
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
        backTopStatus: false
      }
    },
    methods: {
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
      }
    },
    mounted () {
      let vm = this
      vm.$nextTick(function () {
        let $cont = document.getElementById('ladyMain')
        $cont.onscroll = function () {
          vm.backTopStatus = $cont.scrollTop > 200
        }
      })
    }
  }
</script>

<style lang="scss">

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