import { observable, toJS } from 'mobx'

export default class Base {
  _loaded = observable(false)

  get loaded() {
    return this._loaded.get()
  }

  get loading() {
    return !this.loaded
  }

  set loading(val) {
    this._loaded.set(!val)
  }

  set loaded(val) {
    this._loaded.set(!!val)
  }

  setLoaded() {
    this._loaded.set(true)
  }

  setLoading() {
    this._loaded.set(false)
  }

  load() {}

  get data() {
    const data = this.toJS()
    Object.keys(data).forEach(key => {
      if (key[0] === '_') {
        delete data[key]
      }
    })
    return data
  }

  toJS() {
    return toJS(this)
  }

}
