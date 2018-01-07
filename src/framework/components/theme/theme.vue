/*
 * @Author: ChaoLeer
 * @Date: 2017-08-23 09:14:12
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-09-19 17:06:18
 * @Description: 主题组件，默认为列表式展示，通过active进行展开控制
 */
<template> 
  <climb-dropdown :active="active" :right="50" :width="180" :list="themeList" @on-select="themeSelect"></climb-dropdown>
</template>
<script>
  import themes from '@/assets/theme'
  import {getStorageValue, setStorage} from '@/framework/common/storage'
  export default {
    data () {
      return {
        theme: '',
        // active: false,
        themeList: []
      }
    },
    props: {
      active: {
        type: Boolean,
        default: false
      }
    },
    created () {
      this.getThemeName()
      this.changeTheme(getStorageValue('local', 'theme'))
    },
    methods: {
      changeTheme (val) {
        this.theme = val
        if (val === 'false' ||
        val === false ||
        val === 'null' ||
        val === null) { val = global.theme }
        setStorage('local', 'theme', val)
        const styleEl = this.getThemeStyle()
        styleEl.innerHTML = themes[val]['style'] || ''
      },
      getThemeStyle () {
        const themeId = 'climb-theme'
        let styleEl = document.getElementById(themeId)
        if (styleEl) return styleEl
        styleEl = document.createElement('style')
        styleEl.id = themeId
        document.body.appendChild(styleEl)
        return styleEl
      },
      getThemeName () {
        let tname = Object.values(themes)
        let tem = []
        tname.forEach((item) => {
          tem.push({'label': item.label, 'key': item.key, 'style': item.style})
        })
        this.themeList = [...tem]
      },
      themeSelect (val) {
        console.info(val)
        this.changeTheme(val.key)
      }
    }
  }

</script>
