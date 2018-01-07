/*
 * @Author: ChaoLeer
 * @Date: 2017-08-23 09:00:58
 * @Last Modified by:   ChaoLeer
 * @Last Modified time: 2017-08-23 09:00:58
 * @Description: table render function
 */
export default {
  name: 'Render',
  functional: true,
  props: {
    row: Object,
    render: Function
  },
  render: (h, ctx) => {
    // console.info(ctx.props)
    let params = {
      row: ctx.props.row
    }
    return ctx.props.render(h, params)
  }
}
