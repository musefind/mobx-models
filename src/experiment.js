import { extendObservable, autorun, toJS } from 'mobx'

class Test {
  constructor() {
    extendObservable(this, {
      test: {
        a: '1'
      }
    })
  }
}

const t = new Test()

autorun((arg) => {
  console.log(toJS(t.test))
})

console.log(t.test.constructor.name)
console.log({}.constructor.name)