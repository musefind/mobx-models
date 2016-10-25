'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = require('mobx');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewModel = function () {
  function ViewModel(model) {
    _classCallCheck(this, ViewModel);

    this._original = model;
    this.reset();
  }

  _createClass(ViewModel, [{
    key: 'commit',
    value: function commit() {
      if (this._original.assign) {
        this._original.assign((0, _mobx.toJS)(this));
      } else {
        Object.assign(this._original, (0, _mobx.toJS)(this));
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      (0, _mobx.extendObservable)(this, this._original.data || (0, _mobx.toJS)(this._original));
    }
  }]);

  return ViewModel;
}();

exports.default = ViewModel;