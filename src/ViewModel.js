import { toJS, extendObservable } from 'mobx'

export default class ViewModel {
  _original

  constructor(model) {
    this._original = model
    this.reset()
  }
  
  commit() {
    if (this._original.assign) {
      this._original.assign(toJS(this))
    } else {
      Object.assign(this._original, toJS(this))
    }
  }
  
  reset() {
    extendObservable(this, this._original.data || toJS(this._original))
  }

}