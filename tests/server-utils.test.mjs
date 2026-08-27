import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { cleanText, isSafeSlug, routeForKind } from '../src/lib/content.js';
import { hasValidMediaSignature } from '../src/lib/server/media.js';

test('content helpers preserve the safe public URL contract', () => {
  assert.equal(isSafeSlug('renovasi-rumah-bandung'), true);
  assert.equal(isSafeSlug('Renovasi Rumah'), false);
  assert.equal(routeForKind('LAYANAN'), 'layanan');
  assert.equal(routeForKind('PROYEK'), 'portofolio');
});

test('content helpers trim and cap untrusted form text', () => {
  assert.equal(cleanText('  konsultasi  ', 30), 'konsultasi');
  assert.equal(cleanText('abcdefgh', 4), 'abcd');
});

test('keeps authentication and public inquiry abuse controls in place', () => {
  const auth = readFileSync(new URL('../src/lib/server/auth.ts', import.meta.url), 'utf8');
  const admin = readFileSync(new URL('../src/routes/admin/[module]/+page.server.ts', import.meta.url), 'utf8');
  const inquiries = readFileSync(new URL('../src/lib/server/inquiries.ts', import.meta.url), 'utf8');
  const contact = readFileSync(new URL('../src/routes/kontak/+page.server.ts', import.meta.url), 'utf8');
  assert.match(auth, /export const PBKDF2_ITERATIONS = 600_000/);
  assert.match(auth, /LEGACY_PBKDF2_ITERATIONS = 100_000/);
  assert.match(auth, /password_iterations/);
  assert.match(admin, /credentials\.iterations/);
  assert.match(inquiries, /inquiry_attempts/);
  assert.match(inquiries, /DELETE FROM inquiry_attempts WHERE attempted_at < datetime\('now', '-1 day'\)/);
  assert.match(contact, /RATE_LIMITED/);
});

test('rejects uploads whose bytes do not match the claimed media type', () => {
  assert.equal(hasValidMediaSignature(new Uint8Array([0xff, 0xd8, 0xff, 0x00]), 'image/jpeg'), true);
  assert.equal(hasValidMediaSignature(new Uint8Array([0x89, 0x50, 0x4e, 0x47]), 'image/png'), true);
  assert.equal(hasValidMediaSignature(new Uint8Array([0x3c, 0x73, 0x76, 0x67]), 'image/png'), false);
  assert.equal(hasValidMediaSignature(new TextEncoder().encode('%PDF-1.7'), 'application/pdf'), true);
});
