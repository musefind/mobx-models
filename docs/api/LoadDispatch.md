# LoadDispatch

LoadDispatch is a load dispatcher, register your loaders with it and then call all of them later. It's only use is the
asReactiveLoader currently.

**Examples**

```javascript
class MyComponent {
  componentDidMount() {
    LoadDispatch.callLoaders(this.id)
  }
  
  render() {
    LoadDispatch.beginListening(this.id)
    const results = (
      <div>
        {this.props.collection.map(...)}
      </div>
    )
    LoadDispatch.endListening()
    return results
  }
}
```

## callLoaders

Call the loaders for a specific component.

**Parameters**

-   `component` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## registerLoader

Register a loader, this is a function that should load data for a specific object.

**Parameters**

-   `fn` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 

## beginListening

Begin listening to a component.

**Parameters**

-   `component` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## endListening

End listening to a component.
