import Vue from 'vue'
import Grid from './grid/index.js'
import GlobalSpiner from './spiner'
import Spiner from './spiner/spiner.vue'
import Excel from './excel/excel.vue'
import Badge from './badge/badge.vue'
import Panel from './panel/panel.vue'
import Schedule from './schedule/schedule.vue'
import Dropdown from './dropdown/dropdown.vue'
import Theme from './theme/theme.vue'
import CommonTable from './table/common-table.vue'
import Form from './form/climbForm.vue'
import JsonViewer from './jsonviewer/json-viewer.vue'
import Drawer from './drawer/drawer.vue'
import Timeline from './timeline/timeline'

const climb = {
  grid: Grid,
  spiner: Spiner,
  excel: Excel,
  badge: Badge,
  panel: Panel,
  schedule: Schedule,
  dropdown: Dropdown,
  theme: Theme,
  form: Form,
  drawer: Drawer,
  'common-table': CommonTable,
  'json-viewer': JsonViewer,
  timeline: Timeline
}

// console.info(Vue)
Object.keys(climb).forEach(key => {
  Vue.component('climb-' + key, climb[key])
})
Vue.prototype.$Spiner = GlobalSpiner
