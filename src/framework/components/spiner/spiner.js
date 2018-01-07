// import $ from 'jquery'
// export function loadSpiner () {
//   $(function () {
//     $('.climb-spiner').show()
//   }))
// }
// export function removeSpiner () {
//   $(function () {
//     $('.climb-spiner').hide()
//   })
// }
import Spiner from './spiner.vue'
import Vue from 'vue'

function camelcaseToHyphen (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

Spiner.newInstance = properties => {
  const _props = properties || {}

  let props = ''
  Object.keys(_props).forEach(prop => {
    props += ' :' + camelcaseToHyphen(prop) + '=' + prop
  })
  const div = document.createElement('div')
  div.innerHTML = `<spiner ${props}></spiner >`
  document.body.appendChild(div)

  const _spiner = new Vue({
    el: div,
    data: _props,
    components: { Spiner }
  }).$children[0]

  return {
    update (options) {
      if ('show' in options) {
        _spiner.show = options.show
      }
    },
    component: _spiner,
    destroy () {
      // console.info(div)
      document.body.removeChild(div)
    }
  }
}

export default Spiner
