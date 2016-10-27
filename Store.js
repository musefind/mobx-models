'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.State = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = require('mobx');

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = exports.State = {
  toJS: function toJS() {
    return (0, _mobx.toJS)(this);
  }
};

try {
  if (process.env.NODE_ENV !== 'production') window.State = State;
} catch (e) {}

var Store = function () {
  function Store(object) {
    _classCallCheck(this, Store);

    this.objects = (0, _mobx.observable)((0, _mobx.asMap)({}));
    this._onInsertCallbacks = [];
    this._onRemoveCallbacks = [];

    // the object is a constructor function used to provide new instances.
    if (object) {
      this.object = object;
    } else {
      this.object = _Model2.default;
    }

    // initialize this in the global State object, this contains all objects
    State[object.name] = this;

    this.findOrInitialize = (0, _mobx.action)(object.name + 'Store#findOrInitialize', this.findOrInitialize.bind(this));
    this.remove = (0, _mobx.action)(object.name + 'Store#remove', this.remove.bind(this));
  }

  _createClass(Store, [{
    key: 'find',
    value: function find(id) {
      return this.objects.get(id);
    }
  }, {
    key: 'remove',
    value: function remove(id) {
      var obj = this.objects.get(id);
      if (obj) {
        this._onRemoveCallbacks.forEach(function (cb) {
          return cb(obj);
        });
        this.objects.delete(id);
      }
    }
  }, {
    key: 'onInsert',
    value: function onInsert(fn) {
      this._onInsertCallbacks.push(fn);
    }
  }, {
    key: 'onRemove',
    value: function onRemove(fn) {
      this._onRemoveCallbacks.push(fn);
    }
  }, {
    key: 'findOrInitialize',
    value: function findOrInitialize(params) {
      params = (0, _mobx.toJS)(params || {});
      if (!params.id) {
        return null;
      }

      var obj = this.objects.get(params.id);
      if (obj) {
        (0, _helpers.assignObservables)(obj, params);
      } else {
        if (!(obj instanceof this.object)) {
          obj = new this.object(params);
        }
        this.objects.set(obj.id, obj);
        this._onInsertCallbacks.forEach(function (cb) {
          return cb(obj);
        });
      }

      return obj;
    }
  }, {
    key: 'toJS',
    value: function toJS() {
      return (0, _mobx.toJS)(this);
    }
  }]);

  return Store;
}();

exports.default = Store;