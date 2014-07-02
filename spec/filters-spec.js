// Jasmine unit tests
// To run tests, run these commands from the project root:
// 1. `npm test`

'use strict';
var fs     = require('fs');
var filter = require('../index');

var __dirname = 'spec/';

var test = function (name, options) {

  // css
  var css = fs.readFileSync(__dirname + name + '.css', 'utf-8');
  var expected = fs.readFileSync(__dirname + name + '.out.css', 'utf-8');

  // process
  var processed = filter.process(css, options);

  expect(processed).toBe(expected);
};

describe('pleeease-filters', function () {

  it('should not add SVG filters when none', function() {

    test('none');

  });

  it('should convert grayscale filters', function() {

    test('grayscale');

  });

  it('should convert sepia filters', function() {

    test('sepia');

  });

  it('should convert saturate filters', function() {

    test('saturate');

  });

  it('should convert hue-rotate filters', function() {

    test('hueRotate');

  });

  it('should convert invert filters', function() {

    test('invert');

  });

  it('should convert opacity filters', function() {

    test('opacity');

  });

  it('should convert brightness filters', function() {

    test('brightness');

  });

  it('should convert contrast filters', function() {

    test('contrast');

  });

  it('should convert blur filters', function() {

    test('blur');

  });

  it('should convert drop-shadow filters', function() {

    test('dropShadow');

  });

  it('should convert multiple filters', function() {

    test('multiple');

  });

  it('should not convert invalid filters', function() {

    test('invalid');

  });

  it('should deal correctly with edge cases', function() {

    test('edge');

  });

  it('should add IE filter when asking', function() {

    test('ie', {oldIE: true});

  });

});