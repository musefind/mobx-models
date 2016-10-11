import { toJS, observable } from 'mobx'
import Model from './Model'

export const State = {
  toJS() {
    return toJS(this)
  }
}

export default class Store {
  objects = observable([])
  object
  callbacks = []

  constructor(object) {
    // the object is a constructor function used to provide new instances.
    if (object) {
      this.object = object 
    } else {
      this.object = Model
    }
    
    // initialize this in the global State object, this contains all objects
    State[object.name] = this
  }

  find(id) {
    return this.objects.find(o => o.id === id)
  }

  remove(id) {
    const obj = this.objects.find(o => o.id === id)
    if (obj) {
      this.objects.remove(obj)
    }
  }
  
  listen(fn) {
    this.callbacks.push(fn)
  }

  findOrInitialize(params) {
    let obj

    if (params.id) {
      obj = this.objects.find(o => !!o.id && o.id === params.id)
    }

    if (obj) {
      console.log(`store ${this.object.name} > initialize`, obj.id, obj._oid)
      obj.assign(params)
    } else {
      obj = new this.object(params)
      console.log(`store ${this.object.name} > new`, obj.id, obj._oid)
      this.objects.push(obj)
      this.callbacks.forEach(cb => {
        cb(obj)
      })
    }

    return obj
  }
  
  toJS() {
    return toJS(this)
  }

}

try {
  if (process.env.NODE_ENV !== 'production') {
    window.State = State
  }
} catch (e) {}
