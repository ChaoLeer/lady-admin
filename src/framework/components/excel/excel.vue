/*
 * @Author: ChaoLeer
 * @Date: 2017-08-23 09:04:28
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-08-23 09:05:46
 * @Description: 表格导入组件，需要注意excel的格式，(单行，无合并，非特殊性表格)
 */
<template>
  <div class="vue-xlsx-container">
    <!--<button type="button" class="xlsx-button" @click="handleUploadBtnClick">
    </button>-->
    <div @click="handleUploadBtnClick">
      <slot></slot>
    </div>
    <input id="upload-input" type="file" :accept="accept" class="c-hide" @change="handkeFileChange">
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: 'vue-xlsx-table',
  data () {
    return {
      rawFile: null,
      workbook: null,
      tableData: {}
    }
  },
  props: {
    accept: {
      type: String,
      default: '.xlsx, .xls'
    },
    rABS: {
      type: Boolean,
      default: false
    }
  },
  created () {
    console.info(window.xlsxEventBus)
  },
  methods: {
    handkeFileChange (e) {
      let vm = this
      if (this.rawFile !== null) {
        return
      }
      this.rawFile = e.target.files[0]
      this.fileConvertToWorkbook(this.rawFile)
        .then((workbook) => {
          vm.workbook = workbook
          let rst = vm.toJson(vm.workbook)
          vm.initTable(rst)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    fileConvertToWorkbook (file) {
      let reader = new FileReader()
      let fixdata = (data) => {
        let o = ''
        let l = 0
        let w = 10240
        for (; l < data.byteLength / w; ++l) {
          o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
        }
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
        return o
      }
      return new Promise((resolve, reject) => {
        try {
          reader.onload = (renderEvent) => {
            let data = renderEvent.target.result
            if (this.rABS) {
              /* if binary string, read with type 'binary' */
              resolve(XLSX.read(data, { type: 'binary' }))
            } else {
              /* if array buffer, convert to base64 */
              let arr = fixdata(data)
              resolve(XLSX.read(btoa(arr), { type: 'base64' }))
            }
          }
          reader.onerror = (error) => {
            reject(error)
          }
          if (this.rABS) {
            reader.readAsBinaryString(file)
          } else {
            reader.readAsArrayBuffer(file)
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    toJson (workbook) {
      var result = {}
      let vm = this
      // 获取 Excel 中所有表名
      // var sheetNames = workbook.SheetNames // 返回 ['sheet1', 'sheet2']
      workbook.SheetNames.forEach(function (sheetName) {
        var worksheet = workbook.Sheets[sheetName]
        let _body = []
        let _header = []
        _body = XLSX.utils.sheet_to_json(worksheet)
        _header = vm.xlsxArrToTableArr(_body)
        result[sheetName] = Object.assign({}, result[sheetName], {
          header: _header,
          body: _body
        })
      })
      console.info(result)
      return result
    },
    xlsxArrToTableArr (xlsxArr) {
      let length = 0
      let maxLength = 0
      let maxLengthIndex = 0
      xlsxArr.forEach((item, index) => {
        length = Object.keys(item).length
        if (maxLength < length) {
          maxLength = length
          maxLengthIndex = index
        }
      })
      let tableHeader = Object.keys(xlsxArr[maxLengthIndex])
      return tableHeader
    },
    tableArrToXlsxArr ({ data, header }) {
      let xlsxArr = []
      let tempObj = {}
      data.forEach((rowItem) => {
        tempObj = {}
        rowItem.forEach((item, index) => {
          tempObj[header[index]] = item
        })
        xlsxArr.push(tempObj)
      })
      return xlsxArr
    },
    initTable (rst) {
      this.tableData = rst
      // this.tableData.header = header
      // this.tableData.body = data
      this.$emit('on-select-file', this.tableData)
    },
    handleUploadBtnClick () {
      this.clearAllData()
      document.getElementById('upload-input').click()
    },
    clearAllData () {
      document.getElementById('upload-input').value = null
      this.tableData = {}
      this.rawFile = null
      this.workbook = null
    }
  }
}
</script>

<style lang="scss">
.vue-xlsx-container {
  display: inline-block;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .c-hide {
    display: none;
  }
}

.xlsx-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #20a0ff;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  padding: 7px 9px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
  background-color: #20a0ff;
  &.button-large {
    padding: 10px 15px;
    font-size: 14px;
  }
  &.button-primary {
    color: #1f2d3d;
    border: 1px solid #bfcbd9;
    background-color: #fff;
  }
}
</style>
