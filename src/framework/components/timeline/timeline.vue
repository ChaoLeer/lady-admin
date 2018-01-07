<template>
  <!-- Timeline -->
  <div class="timeline">
    <!-- Timeline item -->
    <div class="timeline-item" v-for="itm in data">
      <div class="timeline-item-left" :style="{width: leftWidth + 'px'}">
        <timeline-render v-if="itm.leftRender" :item="itm" :render="itm.leftRender"></timeline-render>
        <div v-else class="timeline-item-inner">{{itm.left}}</div>
      </div>
      <div class="timeline-item-divider"></div>
      <div class="timeline-item-content">
        <timeline-render v-if="itm.contentRender" :item="itm" :render="itm.contentRender"></timeline-render>
        <div v-else class="timeline-item-inner">{{itm.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import render from '../base/render'
  export default {
    data () {
      return {}
    },
    components: {'timeline-render': render},
    props: {
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      leftWidth: {
        type: Number,
        default: 50
      }
    }
  }
</script>

<style lang="scss" scoped>
  .timeline {
    padding: 0 15px;
    box-sizing: border-box;
    .timeline-item {
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: start;
      -ms-flex-pack: start;
      -webkit-justify-content: flex-start;
      justify-content: flex-start;
      overflow: hidden;
      padding: 2px 0 15px;
      box-sizing: border-box;
      position: relative;
      .timeline-item-left {
        -webkit-flex-shrink: 0;
        -ms-flex: 0 0 auto;
        flex-shrink: 0;
        width: 50px;
        text-align: right;
        box-sizing: border-box;
      }
      .timeline-item-divider {
        width: 1px;
        margin: 0 15px;
        position: relative;
        width: 10px;
        height: 10px;
        background: #bbb;
        border-radius: 50%;
        margin-top: 3px;
        -webkit-flex-shrink: 0;
        -ms-flex: 0 0 auto;
        flex-shrink: 0;
        &:before,
        &:after{
          content: ' ';
          width: 1px;
          height: 100vh;
          position: absolute;
          left: 50%;
          background: inherit;
          -webkit-transform: translate3d(-50%,0,0);
          transform: translate3d(-50%,0,0);
        }
        &:before {
          bottom: 100%;
        }
        &:after{
          top: 100%;
        }
      }
      .timeline-item-content {
        margin: 2px;
        min-width: 0;
        position: relative;
        -webkit-flex-shrink: 10;
        -ms-flex: 0 10 auto;
        flex-shrink: 10;
      }
    }
  }
</style>
