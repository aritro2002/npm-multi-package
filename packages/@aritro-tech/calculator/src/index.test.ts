import assert from 'node:assert/strict';
import { test } from 'node:test';

import { Calculator, DivideByZeroError, calc } from './index.ts';

test('chains operations across the sibling packages', () => {
  const result = calc(10).add(5).subtract(3).multiply(2).value();
  assert.equal(result, 24);
});

test('is immutable, so a chain can be forked', () => {
  const base = calc(100).subtract(20);
  assert.equal(base.add(5).value(), 85);
  assert.equal(base.add(10).value(), 90);
  assert.equal(base.value(), 80);
});

test('plusPercent adds a percentage of the running value', () => {
  assert.equal(calc(200).plusPercent(18).value(), 236);
});

test('divide rejects zero', () => {
  assert.throws(() => calc(1).divide(0), DivideByZeroError);
  assert.equal(calc(9).divide(2).value(), 4.5);
});

test('round trims float drift without touching history', () => {
  const chain = calc(0.1).add(0.2);
  assert.equal(chain.round(2).value(), 0.3);
  assert.equal(chain.round(2).history().length, 1);
});

test('Calculator.sum seeds from a list', () => {
  assert.equal(Calculator.sum([1, 2, 3]).multiply(2).value(), 12);
});

test('history records every step', () => {
  const history = calc(1).add(1).multiply(3).history();
  assert.deepEqual(history, [
    { op: 'add', operand: 1, result: 2 },
    { op: 'multiply', operand: 3, result: 6 },
  ]);
});
