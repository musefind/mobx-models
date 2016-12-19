class LoadDispatch {
  _loaders = []
  _listening = false

  callLoaders() {
    this._loaders.forEach(fn => fn())
  }

  callLoadersAsync() {
    // this is an 'async' version of call loaders, it sticks the function on
    // the back of the queue by using setTimeout 0. This is needed to get around
    // some mobx errors.
    const copy = this._loaders.slice()
    setTimeout(() => { copy.forEach(fn => fn()) }, 0)
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
