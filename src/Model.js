import { observable, toJS, extendObservable } from 'mobx'
import { camelize } from './helpers'
import config from './config'

let globalOid = 0

export default class Model {
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

  init(data) {
    if (config.shouldCamelize) {
      data = camelize(data)
    }
    
    this._oid = globalOid += 1

    if (!data.id) {
      data.id = null
    }

    Object.keys(data).forEach(key => {
      if (config.mapNameToStore[key]) {
        const store = config.mapNameToStore[key]

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

    extendObservable(this, data)
  }

  assign(data) {
    if (config.shouldCamelize) {
      data = camelize(data)
    }
    
    Object.keys(data).forEach(param => {
      if (this[param] && this[param].constructor.name === 'ObservableArray') {
        this[param].replace(data[param])
      } else if (this[param] && this[param].constructor.name === 'Object') {
        Object.keys(data[param]).forEach(key => this[param][key] = data[param][key])
      } else {
        this[param] = data[param]
      }
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
