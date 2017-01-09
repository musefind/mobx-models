import {Component} from 'react'
import LoadDispatch from './LoadDispatch'
import { observer } from 'mobx-react'

export const asReactiveLoader = (component) => { 
  const observerComp = observer(component)
  const base = observerComp.prototype.render
  const oldDidUpdate = observerComp.prototype.componentDidUpdate
  const oldDidMount = observerComp.prototype.componentDidMount 
  var name = component.name || component.displayName || getComponentName(component)

  if (!base) throw new Error("Render must exist on component");

  observerComp.prototype.render = function () {
    if (!this._loaderID) {
      this._loaderID = name + Math.random().toFixed(5)
    }
    LoadDispatch.beginListening(this._loaderID)

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
    LoadDispatch.callLoaders(this._loaderID)
  }

  observerComp.prototype.componentDidMount = function() {
    if (oldDidMount) {
      oldDidMount.apply(this, arguments)
    }
    LoadDispatch.callLoaders(this._loaderID)
  }

  return observerComp
}

const getComponentName = (component) => {
  let result = /^function\s+([\w\$]+)\s*\(/.exec( func.toString() )
  return  result  ?  result[ 1 ]  :  'Component' // for an anonymous function there won't be a match
}
