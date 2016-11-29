import { observable } from 'mobx'
import Base from './Base'

// Questions:
// - storing results array, as list of ID's or as list of objects
// - where to put collections
// - subscriptions to updates
//
// Basic Usage:
// - will autoload users based on the provided function.
// ```
// const users = new Collection(() => api.loadUsers())
// users.map(users => user)
// ```
export default class Collection extends Base {
  _results = observable([])
  _locked = false
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

  get length() {
    return this._results.length
  }

  map(fn) {
    return this.results.map(fn)
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

  push(obj) {
    return this.results.push(obj)
  }

  load(force) {
    return new Promise((resolve, reject) => {
      if (this._locked) {
        return resolve(this._results)
      }
      
      if (this.loaded && !force) {
        return resolve(this._results)
      }

      this._locked = true
      this.loader()
        .then(results => {
          this._results.replace(results)
          
          this.setLoaded()
          this._locked = false
          resolve(this._results)
        })
        .catch((err) => {
          console.warn("Error while loading query", err)
          this._locked = false
          reject(err)
        })
    })
  }

}
