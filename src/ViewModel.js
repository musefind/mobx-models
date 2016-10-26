import { toJS, extendObservable, action } from 'mobx'
import { proxyTo } from './helpers'

export default class ViewModel {
  modelClass
  model
  errors
  data = {}

  constructor(opts) {
    this.model = opts.model
    this.modelClass = opts.modelClass

    extendObservable(this, {
      errors: []
    })
    
    extendObservable(this.data, this.original)
    proxyTo(this, this.data)
  }

  set = action((key, val) => {
    this.onSet(key, val)
    this.data[key] = val
  })

  onSet(key, val) {}

  validate() { return true }
  
  commit() {
    if (!this.validate()) return false;

    this.force()
    return true
  }

  create() {
    if (!this.modelClass) {
      throw new Error("When creating from a ViewModel a modelClass must be provided.")
    }

    this.model = new this.modelClass()
    if (this.commit()) {
      return this.model
    }

    return null
  }
  
  force() {
    if (this.model.assign) {
      this.model.assign(toJS(this.data))
    } else {
      Object.assign(this.model, toJS(this.data))
    }
  }

  get original() {
    return this.model.data || toJS(this.model)
  }

  reset() {
    Object.assign(this.data, this.original)
  }

}
