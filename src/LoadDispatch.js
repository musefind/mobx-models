/**
 * LoadDispatch is a load dispatcher, register your loaders with it and then call all of them later. It's only use is the
 * asReactiveLoader currently.
 * 
 * @example
 * class MyComponent {
 *   componentDidMount() {
 *     LoadDispatch.callLoaders(this.id)
 *   }
 *   
 *   render() {
 *     LoadDispatch.beginListening(this.id)
 *     const results = (
 *       <div>
 *         {this.props.collection.map(...)}
 *       </div>
 *     )
 *     LoadDispatch.endListening()
 *     return results
 *   }
 * }
 */
class LoadDispatch {
  _loaders = {}
  _listening = false
  _currentComponent = undefined

  /**
   * Call the loaders for a specific component.
   * @param {String} component
   */
  callLoaders(component) {
    this._loaders[component].forEach(fn => {
      fn()
    })
  }

  /**
   * Register a loader, this is a function that should load data for a specific object.
   * @param {Function} fn
   */
  registerLoader(fn) {
    if (this._listening) {
      this._loaders[this._currentComponent].push(fn)
    }
  }

  /**
   * Begin listening to a component.
   * @param {String} component
   */
  beginListening(component) {
    this._currentComponent = component
    this._listening = true
    this._loaders[component] = []
  }

  /**
   * End listening to a component.
   */
  endListening() {
    this._listening = false
    this._currentComponent = undefined
  }
}

const loadDispatch = new LoadDispatch()
export default loadDispatch