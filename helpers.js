'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObject = exports.isArray = exports.assignObservables = exports.proxyTo = exports.camelize = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _mobx = require('mobx');

var camelize = exports.camelize = function camelize(obj) {
  var newObj = {};
  Object.keys(obj).forEach(function (key) {
    if (key.indexOf('_') >= 0) {
      var newKey = '';
      for (var i = 0; i < key.length; i++) {
        if (key[i] === '_') {
          i++;
          newKey += key[i].toUpperCase();
        } else {
          newKey += key[i];
        }
      }
      newObj[newKey] = obj[key];
    } else {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

var proxyTo = exports.proxyTo = function proxyTo(root, obj) {
  Object.keys(obj).forEach(function (key) {
    Object.defineProperty(root, key, {
      enumerable: true,
      configurable: true,
      get: function get() {
        return obj[key];
      },
      set: function set(val) {
        return obj[key] = val;
      }
    });
  });
};

var assignObservables = exports.assignObservables = (0, _mobx.action)(function (root, obj) {
  obj = (0, _mobx.toJS)(obj);

  Object.keys(obj).forEach(function (key) {
    var source = obj[key];
    var destination = root[key];

    if (!destination) {
      root[key] = source;
      return;
    }

    if (destination.assign) {
      destination.assign(source);
      return;
    }

    if ((0, _mobx.isObservableArray)(destination)) {
      // destination.replace(source)
      root[key] = source;
      return;
    }

    if ((0, _mobx.isObservableMap)(destination)) {
      // destination.clear()
      destination.merge(source);
      return;
    }

    if (isObject(destination) && isObject(source)) {
      Object.keys(source).forEach(function (key) {
        destination[key] = source[key];
      });
      return;
    }

    root[key] = source;
  });
});

var isArray = exports.isArray = function isArray(item) {
  return Object.prototype.toString.call(item) === '[object Array]';
};

var isObject = exports.isObject = function isObject(item) {
  return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null;
};