
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
