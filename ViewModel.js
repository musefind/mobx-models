'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = require('mobx');

var _helpers = require('./helpers');

var _Model = require('./Model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewModel = function () {
  function ViewModel(model, modelClass) {
    var _this = this;

    _classCallCheck(this, ViewModel);

    this.data = {};
    this.set = (0, _mobx.action)(function (key, val) {
      _this.onSet(key, val);
      _this.data[key] = val;
    });

    this.model = model;
    this.modelClass = modelClass;

    (0, _mobx.extendObservable)(this, {
      errors: []
    });

    (0, _mobx.extendObservable)(this.data, this.original);
    (0, _helpers.proxyTo)(this, this.data);
  }

  _createClass(ViewModel, [{
    key: 'onSet',
    value: function onSet(key, val) {}
  }, {
    key: 'validate',
    value: function validate() {
      return true;
    }
  }, {
    key: 'commit',
    value: function commit() {
      if (!this.validate()) return false;

      (0, _Model.assign)(this.model, (0, _mobx.toJS)(this.data));
      return true;
    }
  }, {
    key: 'create',
    value: function create() {
      if (!this.modelClass) {
        throw new Error("When creating from a ViewModel a modelClass must be provided.");
      }

      this.model = new this.modelClass();
      if (this.commit()) {
        return this.model;
      }

      return null;
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