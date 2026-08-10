import assert from 'node:assert/strict';
import test from 'node:test';
import { cleanText, isSafeSlug, routeForKind } from '../src/lib/content.js';

test('content helpers preserve the safe public URL contract', () => {
  assert.equal(isSafeSlug('renovasi-rumah-bandung'), true);
  assert.equal(isSafeSlug('Renovasi Rumah'), false);
  assert.equal(routeForKind('LAYANAN'), 'layanan');
  assert.equal(routeForKind('PROYEK'), 'proyek');
});

test('content helpers trim and cap untrusted form text', () => {
  assert.equal(cleanText('  konsultasi  ', 30), 'konsultasi');
  assert.equal(cleanText('abcdefgh', 4), 'abcd');
});
