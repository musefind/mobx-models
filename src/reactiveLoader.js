import {Component} from 'react'
import LoadDispatch from './LoadDispatch'

export const asReactiveLoader = (component) => {


  if (typeof component === 'function' && !component.prototype) {
    // is stateless functional
    return function (props) {
      LoadDispatch.beginListening()
      const result = component(props)
      LoadDispatch.callLoaders()
      LoadDispatch.endListening()
      return result
    }
    
  } else if (typeof component === 'function') {
    // is component class
    const base = component.prototype.render
    
    if (!base) throw new Error("Render must exist on component");
    
    component.prototype.render = function () {
      LoadDispatch.beginListening()
      const result = base.apply(this, arguments)
      LoadDispatch.callLoaders()
      LoadDispatch.endListening()
      return result
    }

    return component
  }

}
