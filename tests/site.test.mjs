import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('uses SvelteKit, Tailwind, and the Cloudflare adapter', () => {
  assert.ok(existsSync(new URL('../svelte.config.js', import.meta.url)));
  assert.ok(existsSync(new URL('../vite.config.ts', import.meta.url)));
  assert.match(read('../svelte.config.js'), /adapter-cloudflare/);
  assert.match(read('../vite.config.ts'), /tailwindcss/);
  assert.match(read('../src/app.css'), /@import "tailwindcss"/);
});

test('keeps the public and protected route foundations in SvelteKit', () => {
  for (const path of [
    '../src/routes/+page.svelte',
    '../src/routes/layanan/+page.svelte',
    '../src/routes/proyek/+page.svelte',
    '../src/routes/artikel/+page.svelte',
    '../src/routes/kontak/+page.svelte',
    '../src/routes/admin/login/+page.svelte',
    '../src/routes/admin/+layout.server.ts'
  ]) {
    assert.ok(existsSync(new URL(path, import.meta.url)), `${path} should exist`);
  }
});
