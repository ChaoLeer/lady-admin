/*
 * @Author: ChaoLeer
 * @Date: 2017-08-23 09:09:24
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-09-06 16:24:50
 * @Description: json高亮显示排版组件，支持是否可编辑，是否可展开收缩
 */
<template>
  <div :class="{'json-render-border': border}">
    <pre class="json-renderer" :contenteditable="!collapsed && edit" @keyup="changeData($event)" @focus="onFocus" @blur="onBlur"></pre>
  </div>
</template>
<script>
  import $ from 'jquery'
  import '@/framework/lib/json-viewer/jquery.json-viewer.js'
  import '@/framework/lib/json-viewer/jquery.json-viewer.css'
  export default {
    data () {
      return {
        data: this.value,
        jsonString: '',
        status: false
      }
    },
    props: {
      value: {
        type: [String, Object]
      },
      collapsed: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: false
      },
      border: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      value (val) {
        let vm = this
        vm.data = val
      },
      data (val) {
        this.jsonViewer(val)
      },
      status (flag) {
        let vm = this
        if (!flag) {
          vm.jsonPro(vm.jsonString)
        }
      }
    },
    methods: {
      jsonViewer: function (data) {
        let vm = this
        let jsonData
        try {
          JSON.parse(data)
          jsonData = JSON.parse(data)
          vm.renderJsonViewer(jsonData)
        } catch (error) {
          typeof data === 'string'
          ? console.warn('程序检测到为string!') : console.warn('程序检测到为json!')
          vm.renderJsonViewer(data)
        }
      },
      renderJsonViewer: function (d) {
        let vm = this
        vm.$nextTick(function () {
          $(vm.$el).find('.json-renderer').jsonViewer(d, {
            collapsed: vm.collapsed
          })
        })
      },
      jsonPro: function (_json) {
        // try {
        //   JSON.parse(_json)
        //   this.status
        //   ? ''
        //   : this.$emit('input', JSON.parse(_json))
        // } catch (error) {
        //   // this.$Message.error('当前数据为非json格式!')
        //   console.warn('当前数据为非json格式!')
        // }
        this.$emit('input', _json)
      },
      changeData: function (event) {
        let vm = this
        vm.jsonString = event.target.innerText
        vm.jsonPro(vm.jsonString)
      },
      getJson: function () {
        this.$emit('get-json', JSON.parse(this.jsonString))
      },
      onBlur: function () {
        this.status = false
      },
      onFocus: function (event) {
        this.status = true
        this.jsonString = event.target.innerText
      }
    },
    mounted () {
      this.jsonViewer(this.data)
    }
  }
</script>

<style lang="scss">
.json-render-border{
  border: 1px dashed #cacaca;
  padding: 15px;
  &>pre{
    margin: 0;
  }
}
</style>
