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
