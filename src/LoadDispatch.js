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
 *     return (
 *       <div>
 *         {this.props.collection.map(...)}
 *       </div>
 *     )
 *   }
 * }
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