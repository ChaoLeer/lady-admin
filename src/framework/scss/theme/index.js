/**
 * 主题风格
 */
const green = require('!raw-loader!sass-loader!./_theme-green.scss')
// const amber = require('!raw-loader!sass-loader!./_theme-amber.scss')
const lightBlueA700 = require('!raw-loader!sass-loader!./_theme-lightBlueA700.scss')
const orange = require('!raw-loader!sass-loader!./_theme-orange.scss')
const teal600 = require('!raw-loader!sass-loader!./_theme-teal600.scss')
const deeporange = require('!raw-loader!sass-loader!./_theme-deeporange.scss')
const dark = require('!raw-loader!sass-loader!./_theme-dark.scss')
const brown = require('!raw-loader!sass-loader!./_theme-brown.scss')
const bluegrey = require('!raw-loader!sass-loader!./_theme-bluegrey.scss')
const cyan800 = require('!raw-loader!sass-loader!./_theme-cyan800.scss')
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
