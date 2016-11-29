import { extendObservable } from 'mobx'
import Base from './Base'

export const State = {}
const assign = Object.assign

// Questions
// - How to implement subscriptions for self updating
// - Can we generalize save and destroy?
export default class Model extends Base {
  
  static defaultAttributes = {}
  
  id

  static initialize(data) {
    // if this is a User model, it's instances will be a State.User[id]
    if (!State[this.name]) State[this.name] = {};

    // try and find the object
    let object = State[this.name][data.id]

    if (object) {
      assign(object, data)                                // update the object if it exists already
    } else if (data.id) {
      data = Object.assign(data, this.defaultAttributes)  // add in defaults
      object = extendObservable(new this(data), data)     // create a new one
      State[this.name][object.id] = object                // add it to the global state
    } else {
      object = extendObservable(new this(data), data)     // create an 'untracked' model, won't be save in State cuz no ID.
    }

    return object
  }

  // common methods to implement
  retrieve() { return Promise.reject('Not Implemented') }
  
  // Save should be implemented to save this object and update itself
  save() { return Promise.reject('Not Implemented') }
  
  // Destroy should delete the object in the backend and in the state tree
  destroy() { return Promise.reject('Not Implemented') }

  // load will call retrieve and then setLoaded
  load(force) {
    if (this.loaded && !force) return;

    return this.retrieve().then(res => {
      this.setLoaded()
      return res
    })
  }
  
}
