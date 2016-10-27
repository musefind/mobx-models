const autorun = require('mobx').autorun
const observe = require('mobx').observe
const assert = require('assert')
const mobx = require('mobx')

const assertReacts = (instance, field, done, modify) => {
  let times = 0
  let observed = false
  let val = null

  observe(instance, field, () => {
    observed = true
  })

  autorun(() => {
    if (mobx.isObservableArray(instance[field])) {
      val = instance[field][0]
    } else {
      val = instance[field]
    }
    times++
  })

  modify()

  setTimeout(() => {
    assert(times >= 2, 'Autorun was not triggered')
    assert(observed, 'Observe was not triggered')
    done()
  }, 5)
}

const assertNotReacts = (instance, field, done, modify) => {
  let times = 0
  let observed = false
  let val = null

  observe(instance, field, () => {
    observed = true
  })

  autorun(() => {
    val = instance[field]
    times++
  })

  modify()

  setTimeout(() => {
    assert(times == 0, 'Autorun was triggered')
    assert(!observed, 'Observe was triggered')
    done()
  }, 5)
}

module.exports.assertReacts = assertReacts
module.exports.assertNotReacts = assertNotReacts
