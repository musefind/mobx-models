class LoadDispatch {
  _loaders = {}
  _listening = false
  _currentComponent = undefined

  callLoaders(component) {
    this._loaders[component].forEach(fn => {
      fn()
    })
  }

  callLoadersAsync() {
    // this is an 'async' version of call loaders, it sticks the function on
    // the back of the queue by using setTimeout 0. This is needed to get around
    // some mobx errors.
    const copy = this._loaders[component].slice()
    setTimeout(() => { copy.forEach(fn => fn()) }, 0)
  }

  registerLoader(fn) {
    if (this._listening) {
      this._loaders[this._currentComponent].push(fn)
    }
  }

  beginListening(component) {
    this._currentComponent = component
    this._listening = true
    this._loaders[component] = []
  }

  endListening() {
    this._listening = false
    this._currentComponent = undefined
  }
}

const loadDispatch = new LoadDispatch()
export default loadDispatch