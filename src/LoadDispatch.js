class LoadDispatch {
  _loaders = []
  _listening = false

  callLoaders() {
    this._loaders.forEach(fn => {
      fn()
    })
  }

  registerLoader(fn) {
    if (this._listening) {
      this._loaders.push(fn)
    }
  }

  beginListening() {
    this._listening = true
    this._loaders = []
  }

  endListening() {
    this._listening = false
    this._loaders = []
  }
}

const loadDispatch = new LoadDispatch()
export default loadDispatch