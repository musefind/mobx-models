import { toJS, extendObservable, action } from 'mobx'
import { proxyTo } from './helpers'
import { assign } from './Model'

export default class ViewModel {
  modelClass
  model
  errors
  data = {}
  
  constructor(model, modelClass) {
    this.model = model
    this.modelClass = modelClass

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

    assign(this.model, toJS(this.data))
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

  get original() {
    return this.model.data || toJS(this.model)
  }

  reset() {
    Object.assign(this.data, this.original)
  }

}
