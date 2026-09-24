import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  NotANumberError,
  multiply,
  multiplyPrecise,
  percentOf,
  power,
  product,
  productAll,
} from './index.ts';

test('multiply multiplies two numbers', () => {
  assert.equal(multiply(3, 4), 12);
  assert.equal(multiply(-2, 5), -10);
});

test('product handles zero and many arguments', () => {
  assert.equal(product(), 1);
  assert.equal(product(2, 3, 4), 24);
  assert.equal(productAll([5, 0]), 0);
});

test('power raises to integer exponents', () => {
  assert.equal(power(2, 10), 1024);
  assert.equal(power(7, 0), 1);
  assert.throws(() => power(2, -1), RangeError);
  assert.throws(() => power(2, 1.5), RangeError);
});

test('percentOf applies a percentage', () => {
  assert.equal(percentOf(250, 20), 50);
  assert.equal(percentOf(99, 0), 0);
});

test('multiplyPrecise rounds to decimals', () => {
  assert.equal(multiplyPrecise(0.1, 0.2, 2), 0.02);
  assert.equal(multiplyPrecise(1.005, 2, 2), 2.01);
});

test('rejects non-finite input', () => {
  assert.throws(() => multiply(1, Number.NaN), NotANumberError);
  assert.throws(() => multiplyPrecise(1, 2, 16), RangeError);
});
