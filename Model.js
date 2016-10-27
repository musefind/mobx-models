'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = require('mobx');

var _ViewModel = require('./ViewModel');

var _ViewModel2 = _interopRequireDefault(_ViewModel);

var _Store = require('./Store');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var globalOid = 0;

var Model = function () {
  _createClass(Model, [{
    key: 'setLoaded',
    value: function setLoaded() {
      this._loaded.set(true);
    }
  }, {
    key: 'setLoading',
    value: function setLoading() {
      this._loaded.set(false);
    }
  }, {
    key: 'loaded',
    get: function get() {
      return this._loaded.get();
    }
  }, {
    key: 'loading',
    get: function get() {
      return !this.loaded;
    }
  }], [{
    key: 'createViewModel',
    value: function createViewModel() {
      return new _ViewModel2.default(null, this);
    }
  }]);

  function Model(data) {
    _classCallCheck(this, Model);

    this._oid = null;
    this._loaded = (0, _mobx.observable)(false);
    this._viewModel = null;

    this._oid = globalOid += 1;

    data = this.process(data || {});

    if (!data.id) data.id = null;

    this.constructor.fields.forEach(function (field) {
      if (data[field] === undefined) data[field] = null;
    });

    (0, _mobx.extendObservable)(this, data);
    this.initialize(data);
  }

  _createClass(Model, [{
    key: 'process',
    value: function process(data) {
      return data;
    }
  }, {
    key: 'initialize',
    value: function initialize(data) {}
  }, {
    key: 'assign',
    value: function assign(data) {
      data = this.process(data || {});
      (0, _helpers.assignObservables)(this, data);
    }
  }, {
    key: 'insert',
    value: function insert() {
      throw new Error("Insert must be implemented");
    }
  }, {
    key: 'update',
    value: function update() {
      throw new Error("Update must be implemented");
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      throw new Error("Delete must be implemented");
    }
  }, {
    key: 'delete',
    value: function _delete() {
      var _this = this;

      return this.destroy().then(function () {
        _this.store().remove(_this.id);
      });
    }
  }, {
    key: 'retrieve',
    value: function retrieve() {
      throw new Error("Retrieve must be implemented");
    }
  }, {
    key: 'load',
    value: function load() {
      var _this2 = this;

      return this.retrieve().then(function (data) {
        _this2.assign(data);
        _this2.setLoaded();
      });
    }
  }, {
    key: 'save',
    value: function save() {
      var _this3 = this;

      if (this.id) {
        return this.update();
      } else {
        return this.insert().then(function (res) {
          _this3.store().findOrInitialize(_this3);
          return res;
        });
      }
    }
  }, {
    key: 'viewModel',
    value: function viewModel() {
      if (!this._viewModel) this._viewModel = new _ViewModel2.default(this, null);
      return this._viewModel;
    }
  }, {
    key: 'toJS',
    value: function toJS() {
      return (0, _mobx.toJS)(this);
    }
  }, {
    key: 'store',
    value: function store() {
      return _Store.State[this.constructor.name];
    }
  }, {
    key: 'data',
    get: function get() {
      var data = this.toJS();
      Object.keys(data).forEach(function (key) {
        if (key[0] === '_') {
          delete data[key];
        }
      });
      return data;
    }
  }]);

  return Model;
}();

Model.fields = [];
exports.default = Model;