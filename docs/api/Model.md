# Model

**Extends Base**

Class Model.
The model is the smallest piece of state, it should be used to represent a single object coming from the backend.

TODO: Implement LoadDispatch and reactive loading interface.

**Examples**

```javascript
class Influencer extends Model {
  
  // default values are implemented here
  username
  socialProfileId
  name
  
  set socialProfile(val) {
    this._socialProfile = val
  }
  
  // Social profile object is autoloaded here for us. This is optional.
  get socialProfile() {
    if (!this._socialProfile)
      this._socialProfile = SocialProfile.initializeAndLoad({id: this.socialProfileId});
    return this._socialProfile
  }
  
  // how retrieve should be implemented
  retrieve() {
    return api.get(`/social_profiles/${this.id}`, (res) => {
      const data = socialProfileSchema.parseRaw(res.socialProfile)
      Object.assign(this, data)
      return this
    })
  }
}
```

## retrieve

This method is called by load, it should update the model's own internal state and then return a promise.

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

## save

Save should be implemented to save this object and update itself

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

## destroy

Destroy should delete the object in the backend and in the state tree

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

## load

load will call retrieve and then setLoaded. Call force to ensure the model will reload.

**Parameters**

-   `force`  

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

## initialize

Initialize get's an instance of a model, ensuring to return the same instance if it already exists.

**Parameters**

-   `rawData`  

Returns **[Model](#model)** 

## initializeAndLoad

Initialize's the model and then calls load.

**Parameters**

-   `data`  

Returns **[Model](#model)** 

## processData

Process the data before initializing it.

**Parameters**

-   `raw`  

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

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
