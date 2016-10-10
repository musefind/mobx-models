import { observable } from 'mobx'

export default class Collection {
  _loaded = observable(false)
  _results = observable([])
  loader
  store

  constructor(store, loader) {
    this.store = store
    this.loader = loader
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

  load(force) {
    return new Promise((resolve, reject) => {
      if (this.loaded && !force) {
        return resolve(this._results)
      }

      this.loader()
        .then(results => {
          this._results.replace(results.map((r) => this.store.findOrInitialize(r)))
          this.setLoaded()
          resolve(this._results)
        })
        .catch((err) => {
          console.warn("error while loading query", err)
          reject(err)
        })
    })
  }

}
