# Opinionated Mobx Structure

### Overview

MobX Models provides an opinionated structure for managing MobX stores, collections
models and more.

### Currently Included

- Model
- Collection
- Schema
- ViewModel

Check out the files for basic usage.

#### Goals

- Reduce boilerplate for things like loading flags and saving functions
- Only keep one copy of a model at a given time
- First class support for using and working with forms
- Opinionated structure

#### Outstanding Questions / Ideas
- [ ] How to implement subscriptions for self updating.
- [ ] Can we generalize the model save and destroy?
- [x] Collections, storing as list of ID's or list of models. (in stores)
- [x] Where to put collections and how to organize them. (in models)
- [x] View model's still need to be added. (added)