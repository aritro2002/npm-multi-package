import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  NotANumberError,
  deltas,
  difference,
  subtract,
  subtractAll,
  subtractPrecise,
} from './index.ts';

test('subtract takes b from a', () => {
  assert.equal(subtract(10, 4), 6);
  assert.equal(subtract(1, -1), 2);
});

test('subtractAll chains left to right', () => {
  assert.equal(subtractAll([10, 3, 2]), 5);
  assert.equal(subtractAll([7]), 7);
  assert.equal(subtractAll([]), 0);
});

test('difference ignores order', () => {
  assert.equal(difference(3, 8), 5);
  assert.equal(difference(8, 3), 5);
});

test('deltas reports step changes', () => {
  assert.deepEqual(deltas([10, 7, 7, 2]), [-3, 0, -5]);
  assert.deepEqual(deltas([1]), []);
});

test('subtractPrecise avoids float drift', () => {
  assert.equal(subtractPrecise(0.3, 0.1), 0.2);
});

test('rejects non-finite input', () => {
  assert.throws(() => subtract(1, Number.NaN), NotANumberError);
  assert.throws(() => subtractPrecise(1, 2, -1), RangeError);
});
