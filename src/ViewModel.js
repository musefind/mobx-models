import { toJS, extendObservable } from 'mobx'
const assign = Object.assign

/**
 * ViewModel is a class that can emulate a model without changing the underlying model's properties.
 * 
 * @example
 * class InfluencerViewModel extends ViewModel {}
 * const vm = new InfluencerViewModel(influencerInstance)
 * vm.name = 'new name'
 * 
 * // calls view model validate(), and commit's changes to the model if
 * // everything looks ok.
 * vm.commit()
 * vm.commitAndSave() // does what you think
 * 
 */
export default class ViewModel {
  model   // the root model
  errors  // errors are observables can be used how you wish
  data    // this is a copy of the model

  /**
   * Instantiate with the model to emulate.
   * @param {Model} model
   */
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

  /**
   * Implement this method to validate model properties, commit will fail if this method returns false.
   * @returns {Boolean}
   */
  validate() { return true }

  /**
   * Commit the changes back to the root model only if they are valid.
   * @returns {Boolean}
   */
  commit() {
    if (!this.validate()) return false;
    
    assign(this.model, toJS(this.data))
    return true
  }

  /**
   * Commit the changes back to the root model only if they are valid. If validation fails, the promise will be rejected
   * with the view model's errors.
   * @returns {Promise}
   */
  commitAndSave() {
    if (this.commit()) return this.model.save();
    return Promise.reject(this.errors)
  }

  /**
   * The model's original data.
   * @returns {Object}
   */
  get original() {
    return this.model.data || toJS(this.model)
  }
  
  /**
   * Reset to the original data. Return's self.
   * @returns {ViewModel}
   */
  reset() {
    assign(this.data, this.original)
    return this
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
