'use strict';

var _mobx = require('mobx');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Test = function Test() {
  _classCallCheck(this, Test);

  (0, _mobx.extendObservable)(this, {
    test: {
      a: '1'
    }
  });
};

var t = new Test();

(0, _mobx.autorun)(function (arg) {
  console.log((0, _mobx.toJS)(t.test));
});

console.log(t.test.constructor.name);
console.log({}.constructor.name);