# ViewModel

ViewModel is a class that can emulate a model without changing the underlying model's properties.

**Examples**

```javascript
class InfluencerViewModel extends ViewModel {}
const vm = new InfluencerViewModel(influencerInstance)
vm.name = 'new name'

// calls view model validate(), and commit's changes to the model if
// everything looks ok.
vm.commit()
vm.commitAndSave() // does what you think
```

## constructor

Instantiate with the model to emulate.

**Parameters**

-   `model` **Model** 

## validate

Implement this method to validate model properties, commit will fail if this method returns false.

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## commit

Commit the changes back to the root model only if they are valid.

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## commitAndSave

Commit the changes back to the root model only if they are valid. If validation fails, the promise will be rejected
with the view model's errors.

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

## original

The model's original data.

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

## reset

Reset to the original data. Return's self.

Returns **[ViewModel](#viewmodel)** 
