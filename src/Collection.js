import { observable } from 'mobx'

export default class Collection {
  _loaded = observable(false)
  _results = observable([])
  _locked = false
  _opts = {}
  loader
  store

  constructor(store, opts, loader) {
    this.store = store

    if (typeof opts === 'object') {
      if (loader) {
        this.loader = loader
      } else {
        this.loader = opts.loader
      }
      
      this._opts = opts
    } else if (typeof opts === 'function') {
      this.loader = opts
    }

    if (this._opts.onRemove) {
      this.store.onRemove(this._opts.onRemove.bind(this))
    } else {
      this.store.onRemove(this.onStoreRemove.bind(this))
    }

    if (this._opts.onInsert) {
      this.store.onInsert(this._opts.onInsert.bind(this))
    } else {
      this.store.onInsert(this.onStoreInsert.bind(this))
    }

    if (typeof this.loader !== 'function') {
      throw new Error(`Loader is not a function ${this.loader}`)
    }
  }

  get loaded() {
    return this._loaded.get()
  }

  get loading() {
    return !this.loaded
  }

  setLoaded() {
    this._loaded.set(true)
  }

  setLoading() {
    this._loaded.set(false)
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
  
  onStoreRemove(obj) {
    this._results.remove(obj)
  }
  
  onStoreInsert(obj) {
    if (this._opts.takeAll) {
      if (!this._results.find(o => o === obj)) {
        this._results.push(obj)
      }
    }
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
          this._results.replace(results.map((r) => this.store.findOrInitialize(r)))
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
