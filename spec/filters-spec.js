/* global it, expect, describe */
// Jasmine unit tests
// To run tests, run these commands from the project root:
// 1. `npm test`

const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const filter = require('../index');

const specDir = 'spec/cases/';

function test(name, options) {
  // css
  const css = fs.readFileSync(path.join(specDir, `${name}.css`), 'utf-8');
  let expected;

  if (typeof options !== 'undefined' && options.same) {
    expected = css;
  } else {
    expected = fs.readFileSync(path.join(specDir, `${name}.out.css`), 'utf-8');
  }

  // process
  const processed = postcss(filter(options)).process(css);

  expect(processed.css).toBe(expected);
}

describe('pleeease-filters', () => {
  it('should not add SVG filters when none', () => {
    test('none');
  });

  it('should convert grayscale filters', () => {
    test('grayscale');
  });

  it('should convert sepia filters', () => {
    test('sepia');
  });

  it('should convert saturate filters', () => {
    test('saturate');
  });

  it('should convert hue-rotate filters', () => {
    test('hueRotate');
  });

  it('should convert invert filters', () => {
    test('invert');
  });

  it('should convert opacity filters', () => {
    test('opacity');
  });

  it('should convert brightness filters', () => {
    test('brightness');
  });

  it('should convert contrast filters', () => {
    test('contrast');
  });

  it('should convert blur filters', () => {
    test('blur');
  });

  it('should convert drop-shadow filters', () => {
    test('dropShadow');
  });

  it('should convert multiple filters', () => {
    test('multiple');
  });

  it('should not convert invalid filters', () => {
    test('invalid');
  });

  it('should deal correctly with edge cases', () => {
    test('edge');
  });

  it('should add IE filter when asking', () => {
    test('ie', { oldIE: true });
  });

  it('should not add filters if they are already present', () => {
    test('present', { same: true, oldIE: true });
  });
});
