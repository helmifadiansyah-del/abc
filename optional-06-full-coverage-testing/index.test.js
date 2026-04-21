import test from 'node:test';
import assert from 'node:assert';
import sum from './index.js';

test('sum returns correct result for two positive numbers', () => {
  assert.strictEqual(sum(3, 7), 10);
  assert.strictEqual(sum(1.5, 2.5), 4);
});

test('sum returns correct result when one value is zero', () => {
  assert.strictEqual(sum(0, 5), 5);
  assert.strictEqual(sum(5, 0), 5);
  assert.strictEqual(sum(0, 0), 0);
});

test('sum returns 0 when either argument is negative', () => {
  assert.strictEqual(sum(-1, 5), 0);
  assert.strictEqual(sum(5, -1), 0);
  assert.strictEqual(sum(-1, -1), 0);
});

test('sum returns 0 when either argument is not a number', () => {
  assert.strictEqual(sum('1', 2), 0);
  assert.strictEqual(sum(1, '2'), 0);
  assert.strictEqual(sum(null, 2), 0);
  assert.strictEqual(sum(1, undefined), 0);
});

test('sum does not mutate inputs and remains pure', () => {
  const a = 10;
  const b = 20;
  assert.strictEqual(sum(a, b), 30);
  assert.strictEqual(a, 10);
  assert.strictEqual(b, 20);
});
