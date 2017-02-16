/**
 * @private
 */
class LoadDispatch {
  _loaders = {}
  _listening = false
  _currentComponent = undefined

  callLoaders(component) {
    this._loaders[component].forEach(fn => {
      fn()
    })
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