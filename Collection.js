"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = require("mobx");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collection = function () {
  function Collection(store, loader) {
    _classCallCheck(this, Collection);

    this._loaded = (0, _mobx.observable)(false);
    this._results = (0, _mobx.observable)([]);
    this._locked = false;

    this.store = store;
    this.loader = loader;
  }

  _createClass(Collection, [{
    key: "setLoaded",
    value: function setLoaded() {
      this._loaded.set(true);
    }
  }, {
    key: "setLoading",
    value: function setLoading() {
      this._loaded.set(false);
    }
  }, {
    key: "map",
    value: function map(fn) {
      return this.results.map(fn);
    }
  }, {
    key: "forEach",
    value: function forEach(fn) {
      return this.results.forEach(fn);
    }
  }, {
    key: "indexOf",
    value: function indexOf(item) {
      return this.results.indexOf(item);
    }
  }, {
    key: "reverse",
    value: function reverse() {
      return this.results.reverse();
    }
  }, {
    key: "reduce",
    value: function reduce(fn) {
      return this.results.reduce(fn);
    }
  }, {
    key: "reduceRight",
    value: function reduceRight() {
      return this.results.reduceRight();
    }
  }, {
    key: "filter",
    value: function filter(fn) {
      return this.results.filter(fn);
    }
  }, {
    key: "find",
    value: function find(fn) {
      return this.results.find(fn);
    }
  }, {
    key: "load",
    value: function load(force) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this._locked) {
          return resolve(_this._results);
        }

        if (_this.loaded && !force) {
          return resolve(_this._results);
        }

        _this._locked = true;
        _this.loader().then(function (results) {
          _this._results.replace(results.map(function (r) {
            return _this.store.findOrInitialize(r);
          }));
          _this.setLoaded();
          _this._locked = false;
          resolve(_this._results);
        }).catch(function (err) {
          console.warn("Error while loading query", err);
          _this._locked = false;
          reject(err);
        });
      });
    }
  }, {
    key: "loaded",
    get: function get() {
      return this._loaded.get();
    }
  }, {
    key: "loading",
    get: function get() {
      return !this.loaded;
    }
  }, {
    key: "results",
    get: function get() {
      this.load();
      return this._results;
    }
  }, {
    key: "length",
    get: function get() {
      return this._results.length;
    }
  }]);

  return Collection;
}();

exports.default = Collection;