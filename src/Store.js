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
  _onInsertCallbacks = []
  _onRemoveCallbacks = []

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
      this._onRemoveCallbacks.forEach(cb => cb(obj))
    }
  }
  
  onInsert(fn) {
    this._onInsertCallbacks.push(fn)
  }

  onRemove(fn) {
    this._onRemoveCallbacks.push(fn)
  }

  findOrInitialize(params) {
    let obj

    if (params.id) {
      obj = this.objects.find(o => !!o.id && o.id === params.id)
    }

    if (obj) {
      obj.assign(params)
    } else {
      obj = new this.object(params)
      this.objects.push(obj)
      this._onInsertCallbacks.forEach(cb => cb(obj))
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
