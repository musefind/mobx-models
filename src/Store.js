import { toJS, observable, action, asMap } from 'mobx'
import Model, { assign } from './Model'

export const State = {
  toJS() {
    return toJS(this)
  }
}

try { if (process.env.NODE_ENV !== 'production') window.State = State; } catch (e) {}

export default class Store {
  objects = observable(asMap({}))
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

    this.findOrInitialize = action(`${object.name}Store#findOrInitialize`, this.findOrInitialize)
    this.remove = action(`${object.name}Store#remove`, this.remove)
  }

  find(id) {
    return this.objects.get(id)
  }

  remove(id) {
    const obj = this.objects.get(id)
    if (obj) {
      this._onRemoveCallbacks.forEach(cb => cb(obj))
      this.objects.delete(id)
    }
  }
  
  onInsert(fn) {
    this._onInsertCallbacks.push(fn)
  }

  onRemove(fn) {
    this._onRemoveCallbacks.push(fn)
  }

  findOrInitialize(params) {
    if (!params.id) {
      return null
    }
    
    let obj = this.objects.get(params.id)
    if (obj) {
      assign(obj, params)
    } else {
      if (!(obj instanceof this.object)) {
        obj = new this.object(params)
      }
      this.objects.set(obj.id, obj)
      this._onInsertCallbacks.forEach(cb => cb(obj))
    }

    return obj
  }
  
  toJS() {
    return toJS(this)
  }

}
