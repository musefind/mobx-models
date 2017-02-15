import assert from 'assert'
import { asReactiveLoader } from './reactiveLoader'
import LoadDispatch from './LoadDispatch'
import React from 'react'

describe('reactiveLoader', () => {
  
  it('can wrap a component', () => {
    let loaded = false
    
    class NewComponent extends React.Component {
      
      render() {
        LoadDispatch.registerLoader(() => { loaded = true })
        return null
      }
      
    }
    
    let WrappedComponent = asReactiveLoader(NewComponent)
    const component = new WrappedComponent()
    component.render()
    component.componentDidMount()
    
    assert(loaded)
  })
  
})
