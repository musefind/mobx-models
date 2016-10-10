'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = require('mobx');

var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var globalOid = 0;

var Model = function () {
  function Model() {
    _classCallCheck(this, Model);

    this._oid = null;
    this._loaded = (0, _mobx.observable)(false);
  }

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
    key: 'init',
    value: function init(data) {
      var _this = this;

      if (this.constructor.camelize) {
        data = (0, _helpers.camelize)(data);
      }

      this._oid = globalOid += 1;

      if (!data.id) {
        data.id = null;
      }

      Object.keys(data).forEach(function (key) {
        if (_this.constructor.nestedStores[key]) {
          (function () {
            var store = _this.constructor.nestedStores[key];

            if (isArray(data[key])) {
              (function () {
                var newArr = [];
                data[key].forEach(function (val) {
                  newArr.push(store.findOrInitialize(val));
                });
                data[key] = newArr;
              })();
            } else {
              data[key] = store.findOrInitialize(data[key]);
            }
          })();
        }
      });

      this.constructor.fields.forEach(function (field) {
        if (!data[field]) data[field] = null;
      });

      (0, _mobx.extendObservable)(this, data);
    }
  }, {
    key: 'assign',
    value: function assign(data) {
      var _this2 = this;

      if (this.constructor.camelize) {
        data = (0, _helpers.camelize)(data);
      }

      Object.keys(data).forEach(function (param) {
        if (_this2[param] && _this2[param].constructor.name === 'ObservableArray') {
          _this2[param].replace(data[param]);
        } else if (_this2[param] && _this2[param].constructor.name === 'Object') {
          Object.keys(data[param]).forEach(function (key) {
            return _this2[param][key] = data[param][key];
          });
        } else {
          _this2[param] = data[param];
        }
      });
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
    key: 'retrieve',
    value: function retrieve() {
      throw new Error("Retrieve must be implemented");
    }
  }, {
    key: 'load',
    value: function load() {
      var _this3 = this;

      return this.retrieve().then(function (data) {
        _this3.assign(data);
        _this3.setLoaded();
      });
    }
  }, {
    key: 'save',
    value: function save() {
      if (this.id) {
        return this.update();
      } else {
        return this.insert();
      }
    }
  }, {
    key: 'toJS',
    value: function toJS() {
      return (0, _mobx.toJS)(this);
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
  }, {
    key: 'data',
    get: function get() {
      return this.toJS();
    }
  }]);

  return Model;
}();

Model.nestedStores = {};
Model.fields = [];
Model.camelize = false;
exports.default = Model;


function isArray(item) {
  return Object.prototype.toString.call(item) === '[object Array]';
}