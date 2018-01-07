/*
 * @Author: ChaoLeer
 * @Date: 2017-08-23 09:11:56
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-08-23 09:12:19
 * @Description: 加载动画组件，支持全局方法调用
 */
<template>
    <div  v-if="tag" class="climb-spiner">
      <div class="spiner-cover"></div>
      <div class="spiner-cont">
        <slot>
          <i :class="[icon, rotating]" :style="{color: iconColor, fontSize: size+'px'}"></i>
        </slot>
      </div>
    </div>
    <div  v-else class="climb-spiner" v-show="show">
      <div class="spiner-cover"></div>
      <div class="spiner-cont">
        <slot>
          <i :class="[icon, rotating]" :style="{color: iconColor, fontSize: size+'px'}"></i>
        </slot>
      </div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    props: {
      icon: {
        type: Array,
        default () {
          return ['fa fa-spinner fa-pulse']
        }
      },
      tag: {
        type: Boolean,
        default () {
          return false
        }
      },
      rotate: {
        type: Boolean,
        default () {
          return true
        }
      },
      iconColor: {
        type: String,
        default () {
          return ''
        }
      },
      size: {
        type: Number,
        default () {
          return 36
        }
      }
    },
    computed: {
      rotating: function () {
        let vm = this
        return {
          [`climb-rotate`]: !!vm.role
        }
      }
    }
  }
</script>
