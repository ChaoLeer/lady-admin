/*
 * @Author: ChaoLeer
 * @Date: 2017-08-23 09:02:32
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-08-23 09:03:55
 * @Description: 下拉组件，列表支持路由，头部和内容及尾部均支持slot自定义，默认将会以列表形式展示
 */
<template>
  <div class="climb-dropdown" :style="{width: width+'px',top: top +'px',right: right + 'px'}">
    <div class="climb-dropdown-box" :class="{active: active}">
      <slot name="header"></slot>
      <slot>
        <ul class="climb-dropdown-list">
          <template v-if="route">
            <router-link v-for="item,idx in list" :key="idx" :to="item.path" tag="li" class="list-i"><i :class="item.icon"></i>{{item.label}}</router-link>
          </template>
          <template v-else>
            <li class="list-i" v-for="item in list" @click="select(item)"><i :class="item.icon"></i>{{item.label}}</li>
          </template>
        </ul>
      </slot>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      width: {
        type: Number,
        default: 320
      },
      active: {
        type: Boolean,
        default: false
      },
      top: {
        type: Number,
        default: 50
      },
      right: {
        type: Number,
        default: 0
      },
      route: {
        type: Boolean,
        default: false
      },
      list: {
        type: Array,
        default: []
      }
    },
    methods: {
      select: function (item) {
        this.$emit('on-select', item)
      }
    }
  }
</script>
