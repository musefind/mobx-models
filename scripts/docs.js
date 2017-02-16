#!/usr/bin/env node

var documentation = require('documentation');
var fs = require('fs');

var files = fs.readdirSync('./src')
  .filter(f => !f.match(/(.*).test.js/))
  .filter(f => f != 'index.js')
  .map(f => f.split('.')[0])

files.forEach(function(fileName) {
  documentation.build(['src/' + fileName + '.js'], {}, function(err, res) {
    if (err) throw err;
    documentation.formats.md(res, {}, function(err, output) {
      if (err) throw err;
      fs.writeFileSync('./docs/api/' + fileName + '.md', output);
    });
  });
});
