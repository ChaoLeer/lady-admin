/*
 * @Author: ChaoLeer
 * @Date: 2017-08-23 09:11:28
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-08-23 09:11:48
 * @Description: 日程组件
 */
<template>
  <div>
    <div class="schedule-wrapper clearfix">
      <Date-picker type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
      <slot name="header">
        <h3 class="tc" style="line-height: 32px;">
          <div class="fl">
            <Button type="text" shape="circle" icon="ios-arrow-left" @click="changeDate('decyear', 1)">
              <i class="ivu-icon ivu-icon-ios-arrow-left"></i>
            </Button>
            <Button type="text" shape="circle" icon="ios-arrow-left" @click="changeDate('decmonth', 1)"></Button>
          </div>
          {{dateObj.year}}年{{dateObj.month}}月{{dateObj.day}}日
          <div class="fr">
            <Button type="text" shape="circle" icon="ios-arrow-right" @click="changeDate('incmonth', 1)"></Button>
            <Button type="text" shape="circle" icon="ios-arrow-right" @click="changeDate('incyear', 1)">
              <i class="ivu-icon ivu-icon-ios-arrow-right"></i>
            </Button>
          </div>
        </h3>
      </slot>
      <ul class="schedule-head cell-wrapper clearfix">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
        <li>日</li>
      </ul>
      <ul class="schedule-body cell-wrapper clearfix">
        <template  v-for="i in 7*dayRow">
          <!-- <li>ss</li> -->
          <li v-if="(i) < dayFirst(dateObj.year, dateObj.month) && dayFirst(dateObj.year, dateObj.month) > 1"></li> 
          <!-- <li v-if="(i) == 7 && dayFirst(dateObj.year, dateObj.month) == 1"></li> -->
          <li v-if="(i) >= dayFirst(dateObj.year, dateObj.month) && (i) < (monthDays + dayFirst(dateObj.year, dateObj.month))"
            :class="{'schedule-select now': ((i)-dayFirst(dateObj.year, dateObj.month)+1) == dateObj.day && isIncludeNow}"
            @click="selectDay({value: (i) - dayFirst(dateObj.year, dateObj.month) + 1,event: $event})">{{(i) - dayFirst(dateObj.year, dateObj.month) + 1}}</li>
          <li v-if="(i) >=(monthDays + dayFirst(dateObj.year, dateObj.month))"></li>
        </template>
      </ul>
      <Button type="primary" @click="resetDate">重置</Button>
      {{dayRow}}---
      {{7*dayRow}}--{{monthDays}}-{{dayFirst(dateObj.year, dateObj.month)}}
    </div>
    <hr class="mb20 mt20">
  </div>

</template>

<script>
  export default {
    computed: {
      monthDays: function () {
        let vm = this
        let _tdate = new Date(vm.dateObj.year, vm.dateObj.month, 0)
        return _tdate.getDate()
      },
      dayRow: function () {
        let vm = this
        // 获取当前月份的总天数(最后一天),(因为0参数,返回上一个月的最后一天,所以不用在月份上减去1)
        let _tdate = new Date(vm.dateObj.year, vm.dateObj.month, 0)
        let _all = vm.dayFirst(vm.dateObj.year, vm.dateObj.month, 1) - 1 + _tdate.getDate()
        if (_all % 7 === 0) {
          console.info(_all / 7)
          return _all / 7
        } else {
          console.info('parseInt:' + parseInt(_all / 7))
          return parseInt(_all / 7) + 1
        }
      },
      selectDj: function () {
        return this.dateBase.getDate()
      },
      isIncludeNow: function () {
        let vm = this
        if (vm.copyDateBase && vm.dateObj) {
          // console.info('同时存在')
          // if (vm.copyDateBase.getFullYear() === vm.dateObj.year) {
          //   console.info('年份相同')
          // }
          // console.info('base month' + parseInt(vm.copyDateBase.getMonth()) + 1)
          // console.info('now month:' + vm.dateObj.month)
          // if (parseInt(vm.copyDateBase.getMonth()) + 1 === vm.dateObj.month) {
          //   console.info('月份相同')
          // }
          return vm.copyDateBase.getFullYear() === vm.dateObj.year && (parseInt(vm.copyDateBase.getMonth()) + 1) === vm.dateObj.month && vm.copyDateBase.getDate() === vm.dateObj.day
        } else {
          return false
        }
      }
    },
    data () {
      return {
        // isIncludeNow: true,
        dateBase: new Date(),
        copyDateBase: null,
        dateObj: {
          year: '',
          month: '',
          day: ''
        }
      }
    },
    created () {
      this.copyDateBase = this.dateBase
      this.initDate(this.dateBase)
    },
    methods: {
      initDate: function (dateBase) {
        let _tdate = dateBase
        let _now = {}
        _now.year = _tdate.getFullYear()
        _now.month = _tdate.getMonth() + 1
        _now.day = _tdate.getDate()
        this.dateObj = _now
      },
      resetDate: function (date) {
        let vm = this
        if (date && date.constructor === Date) {
          vm.initDate(date)
          vm.$nextTick(function () {
            // vm.siblings(document.getElementsByClassName('now')[0]).forEach(function ($dom) {
            //   $dom.className = $dom.className.replace('schedule-select', '')
            // })
          })
        } else {
          vm.initDate(vm.copyDateBase)
          vm.$nextTick(function () {
            vm.siblings(document.getElementsByClassName('now')[0]).forEach(function ($dom) {
              $dom.className = $dom.className.replace('schedule-select', '')
            })
          })
        }
        // vm.selectDom(document.getElementsByClassName('now')[0])
      },
      changeDate: function (type, count) {
        let vm = this
        let $now = vm.$el.querySelector('.now')
        console.info(vm.$el)
        console.info($now)
        // $now.className = $now.className.replace(' now', '')
        type === 'incyear' ? vm.$set(vm.dateObj, 'year', parseInt(vm.dateObj.year) + parseInt(count)) : ''
        type === 'decyear' ? vm.$set(vm.dateObj, 'year', parseInt(vm.dateObj.year) - parseInt(count)) : ''
        type === 'incmonth' ? (parseInt(vm.dateObj.month) + parseInt(count)) >= 13 ? vm.$set(vm.dateObj, 'month', 1) : vm.$set(vm.dateObj, 'month', parseInt(vm.dateObj.month) + parseInt(count)) : ''
        type === 'decmonth' ? (parseInt(vm.dateObj.month) - parseInt(count)) <= 0 ? vm.$set(vm.dateObj, 'month', 12) : vm.$set(vm.dateObj, 'month', parseInt(vm.dateObj.month) - parseInt(count)) : ''
        // vm.$set(vm.dateObj, 'month', vm.dateObj.month + 1)
      },
      selectDay: function (item) {
        let vm = this
        // let params = vm.dateObj
        vm.$set(vm.dateObj, 'day', item.value)
        let params = vm.dateObj
        vm.$set(params, 'event', item.event)
        // let siblingsNodes = vm.siblings(item.event.target)
        // item.event.target.className = 'schedule-select'
        // siblingsNodes.forEach(function (element) {
        //   element.className = element.className.replace('schedule-select', '')
        // })
        vm.selectDom(item.event.target)
        vm.$Message.info(`${params.year}-${params.month}-${params.day}`)
        // console.info(vm.siblings(item.event.target))
        console.info(params)
      },
      selectDom: function (target) {
        let vm = this
        let siblingsNodes = vm.siblings(target)
        target.className += target.className.replace('schedule-select', '') + ' schedule-select'
        siblingsNodes.forEach(function (element) {
          element.className = element.className.replace('schedule-select', '')
        })
      },
      dayFirst: function (y, m) {
        let _tdate = new Date(y, m - 1, 1)
        // 如果为0则表示为星期天
        if (_tdate.getDay() === 0) {
          return 7
        } else {
          return _tdate.getDay()
        }
      },
      siblings: function (elem) {
        let nodes = []
        // let eleArry = []
        let _elem = elem
        while ((elem = elem.previousSibling)) {
          if (elem.nodeType === 1) {
            nodes.push(elem)
          }
        }
        elem = _elem
        while ((elem = elem.nextSibling)) {
          if (elem.nodeType === 1) {
            nodes.push(elem)
          }
        }
        return nodes
      }
    }
  }

</script>
<style lang="scss">
  .schedule-wrapper{
      display: inline-block;
      margin-bottom: 20px;
    .cell-wrapper{
      border-top: 1px solid #cacaca;
      border-left: 1px solid #cacaca;
      &>li{
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-right: 1px solid #cacaca;
        border-bottom: 1px solid #cacaca;
        float: left;
        cursor: pointer;
        &:nth-child(7n+1){
          clear: left;
        }
      }
    }
  }
</style>
