import { toJS, extendObservable, action } from 'mobx'
import { proxyTo, assignObservables } from './helpers'

export default class ViewModel {
  modelClass
  model
  errors
  data = {}
  
  constructor(model, modelClass) {
    this.model = model
    this.modelClass = modelClass

    // Add in an observable errors object, to use as you like.
    extendObservable(this, {
      errors: {}
    })
    
    // extends the data object as an observable
    extendObservable(this.data, this.original)
    
    // proxy all the methods to this instance, makes it easier to work with
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

    assignObservables(this.model, toJS(this.data))
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
    assignObservables(this.data, this.original)
  }

}
