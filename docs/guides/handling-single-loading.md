# Handling Single Object Loading

TODO

## Store Level
```javascript
class CollabStore {
  
  // Current variables should be always implemented using id's and not
  // using the object itself.
  @observable currentCollabId = null
  
  @computed get currentCollab() {
    if (this.currentCollabId === null || this.currentCollabId === undefined) {
      // implementation choice here, either return (and cache) a new instance
      // or return null.
    } else {
      return Collab.initializeAndLoad({id: this.currentCollabId})    
    }
  }
  
  // This is an optional variable for 'new' models instantiated with forms.
  @observable newCollab = null
  
}


// What the router functions will look like:
route('/collabs/:id', (collabId) => {
  CollabStore.currentCollabId = collabId
})

route('/collabs', () => {
  CollabStore.collabs.load()
})
```

## Model Level
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