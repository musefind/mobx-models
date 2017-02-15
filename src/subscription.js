import { spy } from 'mobx'
import Model from './Model'

const subscriptions = []

const loggingSpy = (evt) => {
  switch (evt.type) {
    case 'add':
    case 'update':
    case 'splice':
    case 'delete':
      if (evt.object instanceof Model) {
        console.log(evt.type, `${evt.object.constructor.name}(${evt.object.id})`, evt.name)
      }
      break
    case 'action':
      let name = 'Object'
      if (evt.target instanceof Model) {
        name = `${evt.target.constructor.name}(${evt.target.id})`
      }
      console.log('action', name, evt.name)
      break
    default:
      console.log(evt)
  }
}

export const logger = () => {
  return spy(loggingSpy)
}
