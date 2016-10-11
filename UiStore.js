'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mobx = require('mobx');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UiStore = function UiStore() {
  _classCallCheck(this, UiStore);

  var data = {};
  this.constructor.fields.forEach(function (field) {
    data[field] = null;
  });
  (0, _mobx.extendObservable)(this, data);
};

UiStore.fields = [];
exports.default = UiStore;