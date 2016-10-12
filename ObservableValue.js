'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = require('mobx');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObservableValue = function () {
  function ObservableValue(value, opts) {
    _classCallCheck(this, ObservableValue);

    this._value = (0, _mobx.observable)(value || null);
    this.set = (0, _mobx.action)(this.set);

    if (opts.onSet) this.onSet = opts.onSet.bind(this);
    if (opts.onGet) this.onGet = opts.onGet.bind(this);
  }

  _createClass(ObservableValue, [{
    key: 'onGet',
    value: function onGet() {}
  }, {
    key: 'onSet',
    value: function onSet() {}
  }, {
    key: 'set',
    value: function set(val) {
      this.onSet(val);
      this._value.set(val);
    }
  }, {
    key: 'get',
    value: function get() {
      this.onGet();
      return this._value.get();
    }
  }, {
    key: 'value',
    get: function get() {
      return this.get();
    }
  }]);

  return ObservableValue;
}();

exports.default = ObservableValue;