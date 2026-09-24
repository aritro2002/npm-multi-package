import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  classify,
  escape,
  isEmail,
  isHexColor,
  isIpv4,
  isIsoDate,
  isSemver,
  isSlug,
  isUrl,
  isUuid,
  toSlug,
} from './index.ts';

test('email validation is anchored', () => {
  assert.ok(isEmail('dev@example.com'));
  assert.ok(!isEmail('not-an-email'));
  assert.ok(!isEmail('dev@example.com extra'));
});

test('url validation accepts http and https only', () => {
  assert.ok(isUrl('https://example.com/path?q=1'));
  assert.ok(!isUrl('ftp://example.com'));
});

test('slug, hex and ipv4', () => {
  assert.ok(isSlug('my-first-post'));
  assert.ok(!isSlug('My-First-Post'));
  assert.ok(isHexColor('#3d5afe'));
  assert.ok(!isHexColor('3d5afe'));
  assert.ok(isIpv4('192.168.0.1'));
  assert.ok(!isIpv4('999.1.1.1'));
});

test('uuid, iso date and semver', () => {
  assert.ok(isUuid('9f8b2c1a-4d3e-4f5a-9b8c-1d2e3f4a5b6c'));
  assert.ok(isIsoDate('2026-09-24'));
  assert.ok(!isIsoDate('2026-13-01'));
  assert.ok(isSemver('1.2.3-beta.1'));
  assert.ok(!isSemver('1.2'));
});

test('patterns are not stateful across calls', () => {
  // A shared /g regex would alternate true/false here.
  assert.ok(isEmail('a@b.co'));
  assert.ok(isEmail('a@b.co'));
});

test('classify lists every matching pattern', () => {
  assert.deepEqual(classify('my-post'), ['slug']);
  assert.deepEqual(classify('   '), []);
});

test('escape and toSlug', () => {
  assert.equal(escape('a.b*c'), 'a\\.b\\*c');
  assert.ok(new RegExp(`^${escape('1+1')}$`).test('1+1'));
  assert.equal(toSlug('  Héllo,  World! '), 'hello-world');
});
