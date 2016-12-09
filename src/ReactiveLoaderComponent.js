import {Component} from 'react'
import LoadDispatch from './LoadDispatch'

export default class ReactiveLoaderComponent extends Component{
  componentWillMount() {
    // We give precedence to the supplied componentWillMount- useful for benchmarking
    if (this.reactiveComponentWillMount) {
        this.reactiveComponentWillMount()
    }

    LoadDispatch.beginListening()
    this.render()
    LoadDispatch.callLoaders()
    LoadDispatch.endListening()
  }
}