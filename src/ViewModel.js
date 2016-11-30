import { toJS, extendObservable } from 'mobx'

const assign = Object.assign

export default class ViewModel {
  model   // the root model
  errors  // errors are observables can be used how you wish
  data    // this is a copy of the model

  constructor(model) {
    this.model = model

    extendObservable(this, {
      errors: {},
      data: {},
    })

    // Mark the data as observable as well as proxy all of the keys from this object.
    extendObservable(this.data, this.original)
    proxyTo(this, this.data)
  }

  // Add an option for validation
  validate() { return true }

  // Commit the changes back to the root model only if they are valid.
  commit() {
    if (!this.validate()) return false;
    
    assign(this.model, toJS(this.data))
    return true
  }

  // Original data.
  get original() {
    return this.model.data || toJS(this.model)
  }

  // Reset the data, making sure to trigger all of the observables that change.
  reset() {
    assign(this.data, this.original)
  }

}

function proxyTo(root, obj) {
  Object.keys(obj).forEach(key => {
    Object.defineProperty(root, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        return obj[key]
      },
      set: (val) => {
        return obj[key] = val
      }
    })
  })
}
