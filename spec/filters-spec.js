// Jasmine unit tests
// To run tests, run these commands from the project root:
// 1. `npm test`

'use strict';
var fs       = require('fs');
var postcss  = require('postcss');
var __dirname = 'spec/';

var filter = require('../index');

var test     = function (name) {

  // css
  var css = fs.readFileSync(__dirname + name + '.css', 'utf-8');
  var expected = fs.readFileSync(__dirname + name + '.out.css', 'utf-8');

  // process
  var processed = postcss(filter().postcss).process(css).css;

  expect(processed).toBe(expected);
}

describe('pleeease-filters', function () {

  it('should add SVG filters', function() {

    test('filters');

  });

});