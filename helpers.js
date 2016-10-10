'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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