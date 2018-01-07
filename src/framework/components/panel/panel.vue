/*
 * @Author: ChaoLeer
 * @Date: 2017-08-23 09:10:22
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-08-23 09:11:19
 * @Description: panel组件，类似于bootstrap的panel组件，支持是否展开，高度限制
 */
<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <slot name="header">
        <h2 class="panel-title">{{title}}</h2>
      </slot>
      <Icon v-if="toggle" class="panel-close" type="ios-arrow-down" @click.native="toggleHandler"></Icon>
    </div>
    <div class="panel-body">
      <transition class="animated"  mode="out-in"  enter-active-class=" zoomIn" leave-active-class="zoomOut">
        <div v-show="panelActive" :style="{height: height ==='auto' ? height : (height + 'px')}">
          <slot>

          </slot>
        </div>
      </transition>
      <p class="panel-body-more" v-show="!panelActive" @click="toggleHandler"><slot name="more">展开...</slot></p>
    </div>
    <div class="panel-footer" v-if="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        panelActive: true
      }
    },
    props: {
      title: {
        default: ''
      },
      footer: {
        type: Boolean,
        default: false
      },
      height: {
        default: 'auto'
      },
      toggle: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      toggleHandler: function () {
        this.panelActive = !this.panelActive
      }
    }
  }

</script>
