import { observable, toJS } from 'mobx'

/**
 * Base class, this class exposes basic loading and data fetching methods to all it's subclasses.
 */
export default class Base {
  _loaded = observable(false)
  _loading = observable(false)

  /**
   * Is the class loaded?
   * @returns {Boolean}
   */
  get loaded() {
    return this._loaded.get()
  }

  /**
   * Set loaded. Will also set the loading flag to false if not loaded.
   * @param {Boolean} val
   */
  set loaded(val) {
    this._loaded.set(!!val)
    if (this.loaded) this._loading.set(false);
  }

  /**
   * Set loaded, same as loaded = true.
   */
  setLoaded() {
    this._loaded.set(true)
    this._loading.set(false)
  }

  /**
   * Whether the object is currently loading, different from loaded.
   * @returns {Boolean}
   */
  get loading() {
    return this._loading.get()
  }

  /**
   * Set loading, does not affect loaded.
   * @param {Boolean} val
   */
  set loading(val) {
    this._loading.set(!!val)
  }

  /**
   * Set loading to true, does not affect loaded.
   */
  setLoading() {
    this._loading.set(true)
  }

  load() {}

  /**
   * Get this objects internal data. Will only return keys that do not start with `_`.
   * @returns {Object}
   */
  get data() {
    const data = this.toJS()
    Object.keys(data).forEach(key => {
      if (key[0] === '_') {
        delete data[key]
      }
    })
    return data
  }

  /**
   * Call MobX to JS on the object.
   * @returns {Object}
   */
  toJS() {
    return toJS(this)
  }

}
