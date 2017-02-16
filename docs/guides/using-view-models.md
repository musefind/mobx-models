# Using View Models

TODO


```javascript
// View Model
class InfluencerViewModel extends ViewModel {}

const vm = new InfluencerViewModel(influencerInstance)

vm.name = 'new name'

// calls view model validate(), and commit's changes to the model if
// everything looks ok.
vm.commit()
vm.commitAndSave() // does what you think
```
