'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = require('mobx');

var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewModel = function () {
  function ViewModel(model) {
    var _this = this;

    _classCallCheck(this, ViewModel);

    this.data = {};
    this.set = (0, _mobx.action)(function (key, val) {
      _this.data[key] = val;
    });

    this.model = model;
    (0, _mobx.extendObservable)(this.data, this.original);
    (0, _helpers.proxyTo)(this, this.data);
  }

  _createClass(ViewModel, [{
    key: 'validate',
    value: function validate() {
      return true;
    }
  }, {
    key: 'commit',
    value: function commit() {
      if (!this.validate()) return false;

      this.force();
      return true;
    }
  }, {
    key: 'force',
    value: function force() {
      if (this.model.assign) {
        this.model.assign((0, _mobx.toJS)(this.data));
      } else {
        Object.assign(this.model, (0, _mobx.toJS)(this.data));
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      Object.assign(this.data, this.original);
    }
  }, {
    key: 'original',
    get: function get() {
      return this.model.data || (0, _mobx.toJS)(this.model);
    }
  }]);

  return ViewModel;
}();

exports.default = ViewModel;