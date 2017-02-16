import { Component } from 'react'
import LoadDispatch from './LoadDispatch'
import { observer } from 'mobx-react'

/**
 * Turn a component into an observer that reactively loads all dependencies.
 *
 * ### Reactive loading:
 * 
 * Reactive loading works by tracking which pieces of state were accessed during the rendering of a component. When a
 * piece of state is accessed, it should register itself with the LoadDispatch. The componentDidMount method is then
 * overridden to call all of the loader functions registered with the LoadDispatch during rendering. For an example of
 * how this works, view the docs for LoadDispatch.
 *
 * @param component
 * @returns {Component}
 */
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
  let result = /^function\s+([\w\$]+)\s*\(/.exec( component.toString() )
  return  result  ?  result[ 1 ]  :  'Component' // for an anonymous function there won't be a match
}
