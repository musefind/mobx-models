import { observable } from 'mobx'

export default class Collection {
  _loaded = observable(false)
  _results = observable([])
  _locked = false
  loader
  store

  constructor(store, opts, loader) {
    this.store = store
    if (!loader) {
      this.loader = opts
      this.store.listen(this.take.bind(this))
    } else {
      this.loader = loader
      if (opts.takeAll) {
        this.store.listen(this.takeAll.bind(this))
      } else {
        this.store.listen(this.take.bind(this))
      }
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
  
  take(obj) {}
  
  takeAll(obj) {
    if (!this._results.find(o => o._oid === obj._oid)) {
      this._results.push(obj)
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
