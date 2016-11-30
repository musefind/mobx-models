import { observable, toJS } from 'mobx'

export default class Base {
  _loaded = observable(false)
  _loading = observable(false)

  get loaded() {
    return this._loaded.get()
  }

  set loaded(val) {
    this._loaded.set(!!val)
    if (this.loaded) this._loading.set(false);
  }

  setLoaded() {
    this._loaded.set(true)
    this._loading.set(false)
  }

  get loading() {
    return this._loading.get()
  }

  set loading(val) {
    this._loading.set(!!val)
  }

  setLoading() {
    this._loading.set(true)
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
