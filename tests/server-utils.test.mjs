import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
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

test('keeps authentication and public inquiry abuse controls in place', () => {
  const auth = readFileSync(new URL('../src/lib/server/auth.ts', import.meta.url), 'utf8');
  const inquiries = readFileSync(new URL('../src/lib/server/inquiries.ts', import.meta.url), 'utf8');
  const contact = readFileSync(new URL('../src/routes/kontak/+page.server.ts', import.meta.url), 'utf8');
  assert.match(auth, /PBKDF2_ITERATIONS = 600_000/);
  assert.match(auth, /password_iterations/);
  assert.match(inquiries, /inquiry_attempts/);
  assert.match(contact, /RATE_LIMITED/);
});
