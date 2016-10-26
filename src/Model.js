import { observable, toJS, extendObservable, action } from 'mobx'
import ViewModel from './ViewModel'
import { State } from './Store'

let globalOid = 0

export default class Model {
  static nestedStores = {}
  static fields = []
  
  static process(data) { return data }
  
  id
  _oid = null
  _loaded = observable(false)
  _viewModel = null

  get loaded() {
    return this._loaded.get()
  }

  get loading() {
    return !this.loaded
  }

  setLoaded() {
    this._loaded.set(true)
  }

  setLoading() {
    this._loaded.set(false)
  }
  
  constructor(data) {
    data = data || {}
    data = this.constructor.process(data)
    
    this._oid = globalOid += 1

    // Loop through the data and replace each instance of a nested object, recognized through the nested
    // stores object with the instances of that nested object. Handles arrays as well as singletons.
    Object.keys(data).forEach(key => {
      if (this.constructor.nestedStores[key]) {
        const store = this.constructor.nestedStores[key]

        if (isArray(data[key])) {
          data[key] = data[key].map(val => store.findOrInitialize(val))
        } else {
          data[key] = store.findOrInitialize(data[key])
        }

      }
    })
    
    // Ensure that the ID property exists.
    if (!data.id) {
      data.id = null
    }
    
    // Initialize the fields to a null value. Essentially is an easier way of defining observables,
    // especially if you don't have access to decorators.
    this.constructor.fields.forEach(field => {
      if (data[field] === undefined) {
        data[field] = null
      }
    })

    this.assign = action(`${this.constructor.name}.${this._oid}#assign`, this.assign)

    this.onAssign(data)
    
    extendObservable(this, data)
  }
  
  assign(data) {
    data = data || {}
    data = this.constructor.process(data)
    
    this.onAssign(data)

    // Loop through all of the items to assign. If there is are nested objects, meaning that the object
    // has 'assign' defined, then we call this. Otherwise we just set the value.
    // todo: should use Object#assign for Objects?
    Object.keys(data).forEach(param => {
      
      if (this[param] && this[param].assign) {
        this[param].assign(data[param])
        return
      }
      
      this[param] = data[param]
    })

    return this
  }

  onAssign() {}

  insert() {
    throw new Error("Insert must be implemented")
  }

  update() {
    throw new Error("Update must be implemented")
  }

  destroy() {
    throw new Error("Delete must be implemented")
  }
  
  delete() {
    return this.destroy().then(() => {
      this.store().remove(this.id)
    })
  }
  
  retrieve() {
    throw new Error("Retrieve must be implemented")
  }
  
  load() {
    return this.retrieve().then(data => {
      this.assign(data)
      this.setLoaded()
    })
  }

  save() {
    if (this.id) {
      return this.update()
    } else {
      return this.insert().then((res) => {
        this.store().findOrInitialize(this)
        return res
      })
    }
  }
  
  viewModel() {
    if (!this._viewModel) this._viewModel = new ViewModel(this);
    return this._viewModel
  }

  get data() {
    const data = this.toJS()
    Object.keys(data).forEach(key => {
      if (key[0] === '_') {
        delete data[key]
      }
    })
    return data
  }

  toJS() {
    return toJS(this)
  }

  store() {
    return State[this.constructor.name]
  }

}

function isArray(item) {
  return Object.prototype.toString.call(item) === '[object Array]'
}
