import { observable } from 'mobx'
import Base from './Base'
import LoadDispatch from './LoadDispatch'

/**
 * Collection is an observable array of values that is aware of it's loaded state. Collection implements all array
 * methods.
 *
 * @extends Base
 * @implements Array
 *
 * @example
 * const users = new Collection(() => api.loadUsers())
 * users.map(users => user)
 */
export default class Collection extends Base {
  _results = observable([])
  loader

  /**
   * Provide a loader function that returns a promise that resolve with the data that should exist in the collection.
   * @param {Function<Promise>} loader
   */
  constructor(loader) {
    super()
    
    this.loader = loader
    
    if (typeof this.loader !== 'function') {
      throw new Error(`Loader is not a function ${this.loader}`)
    }
  }

  get loaded() {
    LoadDispatch.registerLoader(this.load.bind(this))
    return this._loaded.get()
  }

  get loading() {
    LoadDispatch.registerLoader(this.load.bind(this))
    return this._loading.get()
  }

  get results() {
    LoadDispatch.registerLoader(this.load.bind(this))
    return this._results
  }

  get length() {
    return this.results.length
  }

  empty() {
    this._results = observable([])
  }

  map(fn) {
    return this.results.map(fn)
  }

  get first() {
    return this.results[0]
  }

  forEach(fn) {
    return this.results.forEach(fn)
  }

  indexOf(item) {
    return this.results.indexOf(item)
  }

  reverse() {
    return this.results.reverse()
  }

  reduce(fn) {
    return this.results.reduce(fn)
  }

  reduceRight() {
    return this.results.reduceRight()
  }

  filter(fn) {
    return this.results.filter(fn)
  }

  find(fn) {
    return this.results.find(fn)
  }

  sort(fn) {
    return this.results.sort(fn)
  }

  push(obj) {
    return this.results.push(obj)
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
          this._results.replace(results)
          
          this.setLoaded()
          resolve(this._results)
        })
    })
  }

}
