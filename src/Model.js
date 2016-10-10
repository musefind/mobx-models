import { observable, toJS, extendObservable, isObservableObject } from 'mobx'
import { camelize } from './helpers'

let globalOid = 0

export default class Model {
  static nestedStores = {}
  static fields = []
  static camelize = false
  
  id
  _oid = null
  _loaded = observable(false)

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

    if (this.constructor.camelize) {
      data = camelize(data)
    }

    this._oid = globalOid += 1

    if (!data.id) {
      data.id = null
    }

    Object.keys(data).forEach(key => {
      if (this.constructor.nestedStores[key]) {
        const store = this.constructor.nestedStores[key]

        if (isArray(data[key])) {
          const newArr = []
          data[key].forEach(val => {
            newArr.push(store.findOrInitialize(val))
          })
          data[key] = newArr
        } else {
          data[key] = store.findOrInitialize(data[key])
        }

      }
    })

    this.constructor.fields.forEach(field => {
      if (!data[field]) {
        data[field] = null
      }
    })

    extendObservable(this, data)
  }

  assign(data) {
    if (this.constructor.camelize) {
      data = camelize(data)
    }
    
    Object.keys(data).forEach(param => {
      
      if (this[param].assign) {
        this[param].assign(data[param])
        return
      }
      
      if (this[param] && this[param].constructor.name === 'ObservableArray') {
        this[param].replace(data[param])
        return
      }
      
      if (this[param].constructor.name === 'Object') {
        Object.assign(this[param], data[param])
        return
      }
      
      this[param] = data[param]
    })
  }

  insert() {
    throw new Error("Insert must be implemented")
  }

  update() {
    throw new Error("Update must be implemented")
  }

  destroy() {
    throw new Error("Delete must be implemented")
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
      return this.insert()
    }
  }

  get data() {
    return this.toJS()
  }

  toJS() {
    return toJS(this)
  }

}

function isArray(item) {
  return Object.prototype.toString.call(item) === '[object Array]'
}
