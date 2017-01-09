import {Component} from 'react'
import LoadDispatch from './LoadDispatch'
import { observer } from 'mobx-react'

export const asReactiveLoader = (component) => { 
  const observerComp = observer(component)
  const base = observerComp.prototype.render
  const oldDidUpdate = observerComp.prototype.componentDidUpdate
  const oldDidMount = observerComp.prototype.componentDidMount 

  if (!base) throw new Error("Render must exist on component");
  if (!observerComp.name) throw new Error("Component name is required to load");

  observerComp.prototype.render = function () {
    LoadDispatch.beginListening(observerComp.name)

    // pass the render along to the original render.
    const result = base.apply(this, arguments)

    // need async to keep load requests outside of the mobx-react render.
    LoadDispatch.endListening()
    return result
  }

  observerComp.prototype.componentDidUpdate = function() {
    if (oldDidUpdate) {
      oldDidUpdate.apply(this, arguments)
    }
    LoadDispatch.callLoaders(observerComp.name)
  }

  observerComp.prototype.componentDidMount = function() {
    if (oldDidMount) {
      oldDidMount.apply(this, arguments)
    }
    LoadDispatch.callLoaders(observerComp.name)
  }

  return observerComp

}
