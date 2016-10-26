'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = require('mobx');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewModel = function () {
  function ViewModel(model, validator) {
    var _this = this;

    _classCallCheck(this, ViewModel);

    this.data = {};

    var data = model.data || (0, _mobx.toJS)(model);
    this.model = model;
    this.validator = validator;

    Object.keys(data).forEach(function (key) {
      Object.defineProperty(_this, key, {
        enumerable: true,
        configurable: true,
        get: (0, _mobx.action)(function () {
          return _this.data[key];
        }),
        set: (0, _mobx.action)(function (value) {
          _this.data[key] = value;
        })
      });
    });

    (0, _mobx.extendObservable)(this.data, this.model.data || (0, _mobx.toJS)(this.model));
  }

  _createClass(ViewModel, [{
    key: 'validate',
    value: function validate() {
      if (this.validator) return this.validator(this.data);
      return true;
    }
  }, {
    key: 'commit',
    value: function commit() {
      if (this.model.assign) {
        this.model.assign((0, _mobx.toJS)(this.data));
      } else {
        Object.assign(this.model, (0, _mobx.toJS)(this.data));
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      Object.assign(this.data, this.model.data || (0, _mobx.toJS)(this.model));
    }
  }]);

  return ViewModel;
}();

exports.default = ViewModel;