import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  NotANumberError,
  add,
  addPrecise,
  runningTotal,
  sum,
  sumAll,
} from './index.ts';

test('add sums two numbers', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-4, 1.5), -2.5);
});

test('sum handles zero and many arguments', () => {
  assert.equal(sum(), 0);
  assert.equal(sum(1, 2, 3, 4), 10);
  assert.equal(sumAll([5, 5]), 10);
});

test('runningTotal accumulates', () => {
  assert.deepEqual(runningTotal([1, 2, 3]), [1, 3, 6]);
  assert.deepEqual(runningTotal([]), []);
});

test('addPrecise avoids float drift', () => {
  assert.equal(addPrecise(0.1, 0.2), 0.3);
  assert.equal(addPrecise(1.1, 2.2), 3.3);
  assert.equal(addPrecise(1.567, 2.433, 1), 4);
});

test('rejects non-finite input', () => {
  assert.throws(() => add(1, Number.NaN), NotANumberError);
  assert.throws(() => sum(1, Number.POSITIVE_INFINITY), NotANumberError);
  assert.throws(() => addPrecise(1, 2, 99), RangeError);
});
