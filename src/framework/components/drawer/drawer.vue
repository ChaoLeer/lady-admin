/*
 * @Author: ChaoLeer
 * @Date: 2017-08-23 09:01:25
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-08-23 09:02:11
 * @Description: 抽屉drawer组件,现支持左右方向配置
 */
<template>
  <!-- <div v-transfer-dom :data-transfer="transfer">
    <div class="climb-cover" v-show="visible" @click="coverHandler"></div>
    <div class="climb-drawer climb-paper" v-show="visible" :class="classes"  :style="{width: width+'px'}">
      <slot></slot>
    </div>
  </div> -->
  <div class="climb-drawer-wrapper" v-transfer-dom :data-transfer="transfer">
    <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="climb-cover animated" v-show="visible" @click="coverHandler"></div>
    </transition>
    <transition mode="out-in" :enter-active-class="animationIn" :leave-active-class="animationOut">
        <!-- :class="{open: wrapShow}" -->
      <div class="climb-drawer animated climb-paper" v-show="visible" :class="classes" style="z-index: 203" :style="{width: width+'px'}">
        <div v-if="header" class="climb-drawer-header">
          <slot name="header">
            <h3 class="climb-drawer-title">{{title}}</h3>
          </slot>
        </div>
        <div class="climb-drawer-body" :class="{hasheader: header,hasfooter: footer}">
          <slot></slot>
        </div>
        <div v-if="footer" class="climb-drawer-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import TransferDom from '@/framework/directives/transfordom.js'
export default {
  name: 'drawer',
  data () {
    return {
      style: '',
      visible: this.value,
      wrapShow: false
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },
    visible (val) {
      if (val === false) {
        this.wrapShow = false
      } else {
        this.wrapShow = true
      }
    }
  },
  computed: {
    classes: function () {
      let vm = this
      let arr = []
      if (vm.wrapShow) {
        arr.push('open')
      }
      if (vm.left && !vm.right) {
        arr.push('left')
      }
      if (vm.right) {
        arr.push('right')
      }
      return arr
    },
    animationIn: function () {
      let vm = this
      let cls = ''
      if (vm.left && !vm.right) {
        cls = 'slideInLeft'
      }
      if (vm.right) {
        cls = 'slideInRight'
      }
      return cls
    },
    animationOut: function () {
      let vm = this
      let cls = []
      if (vm.left && !vm.right) {
        cls = 'slideOutLeft'
      }
      if (vm.right) {
        cls = 'slideOutRight'
      }
      return cls
    }
  },
  directives: {
    TransferDom
  },
  props: {
    width: {
      type: Number,
      default: 256
    },
    right: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: true
    },
    value: {
      type: Boolean,
      default: false
    },
    transfer: {
      type: Boolean,
      default: false
    },
    title: '',
    panel: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Boolean,
      default: false
    },
    header: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    coverHandler: function () {
      this.visible = false
      this.$emit('input', false)
    }
  },
  mounted () {
    if (this.visible) {
      this.wrapShow = true
    }
  }
}
</script>
