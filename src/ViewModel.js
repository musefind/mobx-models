import { toJS, extendObservable, action } from 'mobx'

export default class ViewModel {
  model
  validator
  data = {}

  constructor(model, validator) {
    const data = model.data || toJS(model)
    this.model = model
    this.validator = validator

    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get: action(() => {
          return this.data[key]
        }),
        set: action((value) => {
          this.data[key] = value
        }),
      })
    })

    extendObservable(this.data, this.model.data || toJS(this.model))
  }

  validate() {
    if (this.validator) return this.validator(this.data);
    return true
  }
  
  commit() {
    if (this.model.assign) {
      this.model.assign(toJS(this.data))
    } else {
      Object.assign(this.model, toJS(this.data))
    }
  }
  
  reset() {
    Object.assign(this.data, this.model.data || toJS(this.model))
  }

}
