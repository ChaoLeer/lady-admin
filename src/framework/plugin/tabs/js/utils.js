export function isFunction (fn) {
  if (!fn) {
    return false
  }
  return typeof fn === 'function'
}

export function isString (str) {
  if (!str) {
    return false
  }
  return typeof str === 'string'
}

export function isObject (obj) {
  if (!obj) {
    return false
  }
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export const DispatchResize = () => {
  setTimeout(function () {
    if (document.createEvent) {
      var event = document.createEvent('HTMLEvents')
      event.initEvent('resize', true, true)
      window.dispatchEvent(event)
    } else if (document.createEventObject) {
      window.fireEvent('onresize')
    }
  }, 300)
}

export const store = {
  save (key, value) {
    if (!key || !value) {
      return
    }
    window.localStorage[key] = JSON.stringify(value)
  },
  get (key) {
    let value = window.localStorage[key]
    if (!value) {
      return null
    }
    return JSON.parse(value)
  }
}

export const consts = {
  STORE_KEY: '$TABS'
}
