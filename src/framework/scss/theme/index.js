/**
 * 主题风格
 */
// const green = require('./_theme-green.scss')
import green from './_theme-green.theme'
// const amber = require('./_theme-amber.theme')
import lightBlueA700 from './_theme-lightBlueA700.theme'
import orange from './_theme-orange.theme'
import teal600 from './_theme-teal600.theme'
import deeporange from './_theme-deeporange.theme'
import dark from './_theme-dark.theme'
import brown from './_theme-brown.theme'
import bluegrey from './_theme-bluegrey.theme'
import cyan800 from './_theme-cyan800.theme'
export default {
  green: {
    label: '绿色',
    key: 'green',
    style: green
  },
  // amber: {
  //   label: '草色',
  //   key: 'amber',
  //   style: amber
  // },
  lightBlueA700: {
    label: '天蓝',
    key: 'lightBlueA700',
    style: lightBlueA700
  },
  orange: {
    label: '橙色',
    key: 'orange',
    style: orange
  },
  teal600: {
    label: '茶色',
    key: 'teal600',
    style: teal600
  },
  deeporange: {
    label: '深橙色',
    key: 'deeporange',
    style: deeporange
  },
  dark: {
    label: '黑色',
    key: 'dark',
    style: dark
  },
  brown: {
    label: '棕色',
    key: 'brown',
    style: brown
  },
  bluegrey: {
    label: '蓝灰色',
    key: 'bluegrey',
    style: bluegrey
  },
  cyan800: {
    label: '青色',
    key: 'cyan800',
    style: cyan800
  }
}
