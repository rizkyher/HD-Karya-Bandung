import assert from 'node:assert/strict';
import test from 'node:test';
import { canManage, isAdminRoute } from '../src/permissions.js';

test('editor can manage content but never users or audit logs', () => {
  assert.equal(canManage('EDITOR', 'layanan'), true);
  assert.equal(canManage('EDITOR', 'pesan-masuk'), true);
  assert.equal(canManage('EDITOR', 'pengguna'), false);
  assert.equal(canManage('EDITOR', 'audit-log'), false);
});

test('only super admins can manage sensitive settings', () => {
  assert.equal(canManage('SUPER_ADMIN', 'pengaturan'), true);
  assert.equal(canManage('EDITOR', 'pengaturan'), false);
});

test('all admin paths except login are protected', () => {
  assert.equal(isAdminRoute('/admin'), true);
  assert.equal(isAdminRoute('/admin/layanan'), true);
  assert.equal(isAdminRoute('/admin/login'), false);
});
