import { toJS, observable } from 'mobx'
import Model from './Model'

export const State = {
  toJS() {
    return toJS(this)
  }
}

export default class Store {
  objects = observable([])
  object = Model

  constructor(object) {
    if (!object) {
      throw Error.new("Store must be initialized with a Model class")
    }

    // the object is a constructor function used to provide new instances.
    this.object = object

    // initialize this in the global State object, this contains all objects
    State[object.name] = this
  }

  find(id) {
    return this.objects.find(o => o.id === id)
  }

  findOrInitialize(params) {
    let obj

    if (params.id) {
      obj = this.objects.find(o => o.id === params.id)
    }

    if (obj) {
      obj.assign(params)
    } else {
      obj = new this.object(params)
      obj.init(params)
      this.objects.push(obj)
    }

    return obj
  }
  
  toJS() {
    return toJS(this)
  }

}

// if (process.env.NODE_ENV !== 'production' && window) {
//   try { window.State = State } catch (e) {}
// }
