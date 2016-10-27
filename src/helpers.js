import { isObservableArray, isObservableMap, action, toJS } from 'mobx'

export const camelize = (obj) => {
  let newObj = {}
  Object.keys(obj).forEach((key) => {
    if (key.indexOf('_') >= 0) {
      let newKey = ''
      for (let i = 0; i < key.length; i++) {
        if (key[i] === '_') {
          i++
          newKey += key[i].toUpperCase()
        } else {
          newKey += key[i]
        }
      }
      newObj[newKey] = obj[key]
    } else {
      newObj[key] = obj[key]
    }
  })
  return newObj
}

export const proxyTo = (root, obj) => {
  Object.keys(obj).forEach(key => {
    Object.defineProperty(root, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        return obj[key]
      },
      set: (val) => {
        return obj[key] = val
      }
    })
  })
}


export const assignObservables = action((root, obj) => {
  obj = toJS(obj)
  
  Object.keys(obj).forEach(key => {
    const source = obj[key]
    const destination = root[key]
    
    if (!destination) {
      root[key] = source
      return
    }
    
    if (destination.assign) {
      destination.assign(source)
      return
    }
    
    if (isObservableArray(destination)) {
      // destination.replace(source)
      root[key] = source
      return
    }
    
    if (isObservableMap(destination)) {
      // destination.clear()
      destination.merge(source)
      return
    }

    if (isObject(destination) && isObject(source)) {
      Object.keys(source).forEach(key => {
        destination[key] = source[key]
      })
      return
    }

    root[key] = source
  })
})

export const isArray = (item) => {
  return Object.prototype.toString.call(item) === '[object Array]'
}

export const isObject = (item) => {
  return typeof item === 'object' && item !== null
}