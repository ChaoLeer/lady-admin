/*
 * @Author: ChaoLeer
 * @Date: 2017-08-23 09:12:31
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-08-23 09:14:00
 * @Description: 可配置表格组件，详见示例代码或全文检索系统通用表格
 */
<template>
  <div>
    <slot>
      <div class="mt10">
        显示边框 <i-switch v-model="showBorder" class="mr5"></i-switch>
        显示斑马纹 <i-switch v-model="showStripe" class="mr5"></i-switch>
        <!--显示索引 <i-switch v-model="showIndex" style="margin-right: 5px"></i-switch>-->
        表格滚动 <i-switch v-model="fixedHeader" style="margin-right: 5px"></i-switch>
        <p class="fr">
          <span style="position:relative;top:5px">表格尺寸</span>
          <Radio-group v-model="tableSize" type="button">
              <Radio label="large">大</Radio>
              <Radio label="default">中</Radio>
              <Radio label="small">小</Radio>
          </Radio-group>
        </p>
        <br>
        <br>
      </div>
      <Checkbox-group class="mb10" v-if="tableColumnsConfig.length > 0" v-model="tableColumnsChecked" @on-change="changeTableColumns">
          <Checkbox v-for="check,idx in tableColumnsConfig" :key="idx" :label="check.key">{{check.title}}</Checkbox>
      </Checkbox-group>
    </slot>
    <slot name="header"></slot>
    <div v-if="resultTableColumns.length > 0" >
      <Table :data="tableData" :height="fixedHeader?height:''" :columns="resultTableColumns"
       @on-select="onSelect" @on-selection-change="onSelectChange" @on-select-all="onSelectAll"
       :border="showBorder" :stripe="showStripe"  :size="tableSize"></Table>
      <div class="fl mt10 pagenation" >
        <Page ref="climbPage" :total="pageConfig.total" :page-size="pageConfig.pageSize" show-total  @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import {apiBaseConfig} from '@/api'
  export default {
    data () {
      return {
        showBorder: false,
        showStripe: false,
        showIndex: true,
        fixedHeader: false,
        tableSize: 'default',
        resultTableColumns: [],
        tableColumnsChecked: [],
        // 表格非配置列数组
        tableColumnsUnConfig: [],
        // 表格配置列数组
        tableColumnsConfig: []
      }
    },
    props: {
      tableData: {
        type: Array,
        default: []
      },
      tableColumns: {
        type: Object,
        default: function () {
          return {}
        }
      },
      height: {
        type: Number,
        default: 600
      },
      pageConfig: {
        type: Object,
        default: function () {
          return {
            total: 0,
            pageSize: 10,
            current: 1
          }
        }
      }
    },
    created () {
      let vm = this
      Object.keys(vm.tableColumns).forEach(function (item) {
        if (vm.tableColumns[item].isConfig) {
          vm.tableColumnsConfig.push(vm.tableColumns[item])
          vm.tableColumnsChecked.push(vm.tableColumns[item].key)
        } else {
          vm.tableColumnsUnConfig.push(vm.tableColumns[item])
        }
      })
    },
    methods: {
      fetchTableData: function () {
        apiBaseConfig.post()
      },
      changeTableColumns () {
        this.resultTableColumns = this.getTableColumns()
      },
      getTableColumns () {
        let vm = this
        let tableColumns = vm.tableColumns
        let data = [...vm.tableColumnsUnConfig]
        // console.info(data)
        this.tableColumnsChecked.forEach(col => {
          data.push(tableColumns[col])
        })
        return data
      },
      changePage (p) {
        this.$emit('on-change-page', p)
      },
      onSelect (selection, row) {
        this.$emit('on-select', selection, row)
      },
      onSelectAll (selection) {
        this.$emit('on-select-all', selection)
      },
      onSelectChange (selection) {
        this.$emit('on-select-change', selection)
      }
    },
    mounted () {
      this.changeTableColumns()
    }
  }

</script>
