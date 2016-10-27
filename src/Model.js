import { observable, toJS, extendObservable } from 'mobx'
import ViewModel from './ViewModel'
import { State } from './Store'
import { assignObservables } from './helpers'

let globalOid = 0

export default class Model {
  
  static fields = []

  static createViewModel() {
    return new ViewModel(null, this)
  }
  
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
    this._oid = globalOid += 1
    
    data = this.process(data || {})

    if (!data.id) data.id = null;
    
    this.constructor.fields.forEach(field => {
      if (data[field] === undefined) data[field] = null;
    })
    
    extendObservable(this, data)
  }

  process(data) {
    return data
  }
  
  assign(data) {
    data = this.process(data || {})
    console.log('assign', data)
    assignObservables(this, data)
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
    if (!this._viewModel) this._viewModel = new ViewModel(this, null);
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
