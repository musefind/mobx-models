import { action, observable } from 'mobx'

export default class ObservableValue {
  _value

  constructor(value, opts) {
    this._value = observable(value || null)
    this.set = action(this.set)
    
    if (opts.onSet) this.onSet = opts.onSet.bind(this);
    if (opts.onGet) this.onGet = opts.onGet.bind(this);
  }

  onGet() {}

  onSet() {}

  get value() {
    return this.get()
  }

  set(val) {
    this.onSet(val)
    this._value.set(val)
  }

  get() {
    this.onGet()
    return this._value.get()
  }

}
