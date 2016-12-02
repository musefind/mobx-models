import { observable, extendObservable, toJS } from 'mobx'
import Base from './Base'

export default class Singleton extends Base {
  _results = observable({})
  loader

  constructor(loader) {
    super()
    
    this.loader = loader
    
    if (typeof this.loader !== 'function') {
      throw new Error(`Loader is not a function ${this.loader}`)
    }
  }

  get results() {
    this.load()
    return this._results
  }

  get keys() {
    return Object.keys(this._results)
  }

  get(attribute) {
    return this.results[attribute]
  }

  set(attribute, newValue) {
    this._results[attribute] = newValue
  }

  assignGetters(model) {
    Object.keys(model).forEach(key => {
      if (key !== '_loaded' && key !== '_loading') {
        Object.defineProperty(this, key, {
          get: function() { return this._results[key] },
          set: function(value) { this._results[key] = value }
        })
      }
    })
  }

  load(force) {
    return new Promise((resolve, reject) => {
      
      // ensure we don't double load
      if (this.loading) {
        return resolve(this._results)
      }
      
      if (this.loaded && !force) {
        return resolve(this._results)
      }
      
      this.setLoading()
      this.loader()
        .then(results => {
          extendObservable(this._results, toJS(results))
          this.assignGetters(results)
          
          this.setLoaded()
          resolve(this._results)
        })
    })
  }

}
