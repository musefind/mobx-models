import { extendObservable } from 'mobx'

export default class UiStore {
  static fields = []
  
  constructor() {
    const data = {}
    this.constructor.fields.forEach(field => {
      data[field] = null
    })
    extendObservable(this, data)
  }
  
}
