/*
 * @Author: ChaoLeer
 * @Date: 2017-08-23 08:59:29
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-08-23 09:00:45
 * @Description: 图片,或者其他元素(上下左右四个位置)印标签组件
 */
<template>
  <div class="climb-badge-wrapper" :style="{width: width+'px', height: height+'px'}">
    <div class="climb-badge-main" :class="classes">
      <slot>
      </slot>
    </div>
    <div :class="badgeClasses" >
      <slot :name="position ? position:'bottom'">
      </slot>
    </div>
  </div>
</template>

<script>
  import {oneOf} from '@/framework/utils'
  export default {
    props: {
      height: {
        type: Number,
        default: 80
      },
      width: {
        type: Number,
        default: 80
      },
      circle: {
        type: Boolean,
        default: false
      },
      hide: {
        type: Boolean,
        default: true
      },
      position: {
        validator: function (val) {
          return oneOf(val, ['top', 'bottom', 'left', 'right'], 'badge prop: position')
        }
      }
    },
    computed: {
      classes: function () {
        return [
          {
            'circle': this.circle,
            'hide': this.hide
          }
        ]
      },
      badgeClasses: function () {
        let vm = this
        return [
          `climb-badge-${vm.position ? vm.position : 'bottom'}`
        ]
      }
    }
  }

</script>
