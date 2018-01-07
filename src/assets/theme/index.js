/**
 * 主题风格 该文件是项目主题样式文件总入口,在同级目录下新建的主题样式文件,统一在此处进行引入
 * 注释部分即为示例代码
 */
import frameworkTheme from '../../framework/scss/theme'
// const green = require('!raw-loader!sass-loader!./_theme-green.scss')
export default {
  ...frameworkTheme
  // green: {
  //   label: '绿色',
  //   key: 'green',
  //   style: green
  // }
}
