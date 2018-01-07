// 移除storage
let removeStorage = function (type, name) {
  if (type === 'session') {
    window.sessionStorage.removeItem(name)
  }
  if (type === 'local') {
    window.localStorage.removeItem(name)
  }
}

export default removeStorage
