# Collection

**Extends Base**

Collection is an observable array of values that is aware of it's loaded state. Collection implements all array
methods.

**Examples**

```javascript
const users = new Collection(() => api.loadUsers())
users.map(users => user)
```

## constructor

Provide a loader function that returns a promise that resolve with the data that should exist in the collection.

**Parameters**

-   `loader` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)>** 

# Base

Base class, this class exposes basic loading and data fetching methods to all it's subclasses.

## loaded

Is the class loaded?

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## loaded

Set loaded. Will also set the loading flag to false if not loaded.

**Parameters**

-   `val` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## setLoaded

Set loaded, same as loaded = true.

## loading

Whether the object is currently loading, different from loaded.

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## loading

Set loading, does not affect loaded.

**Parameters**

-   `val` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## setLoading

Set loading to true, does not affect loaded.

## data

Get this objects internal data. Will only return keys that do not start with `_`.

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

## toJS

Call MobX to JS on the object.

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

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
