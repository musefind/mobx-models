import {Component} from 'react'
import LoadDispatch from './LoadDispatch'

export const asReactiveLoader = (component) => {


  if (typeof component === 'function' && !component.prototype) {
    // is stateless functional.
    return function (props) {
      LoadDispatch.beginListening()
      const result = component(props)

      // need async to keep load requests outside of the mobx-react render.
      LoadDispatch.callLoadersAsync()
      LoadDispatch.endListening()
      return result
    }

  } else if (typeof component === 'function') {
    // is component class
    const base = component.prototype.render

    if (!base) throw new Error("Render must exist on component");

    component.prototype.render = function () {
      LoadDispatch.beginListening()

      // pass the render along to the original render.
      const result = base.apply(this, arguments)

      // need async to keep load requests outside of the mobx-react render.
      LoadDispatch.callLoadersAsync()
      LoadDispatch.endListening()
      return result
    }

    return component
  }

}
