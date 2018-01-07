import Spiner from './spiner'

let SpinerInstance
let size = 36

function getSpinerInstance () {
  SpinerInstance = SpinerInstance || Spiner.newInstance({
    size: size
  })

  return SpinerInstance
}

function hide () {
  update({
    show: false
  })
}

function update (options) {
  let instance = getSpinerInstance()

  instance.update(options)
}

export default {
  start () {
    update({
      show: true
    })
  },
  finish () {
    hide()
  },
  destroy () {
    let instance = getSpinerInstance()
    SpinerInstance = null
    instance.destroy()
  }
}
