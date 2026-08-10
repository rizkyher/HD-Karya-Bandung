import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../script.js', import.meta.url), 'utf8');

test('exposes a labelled main landmark and a single primary heading', () => {
  assert.match(html, /<main id="content">/);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
  assert.match(html, /<a class="skip-link" href="#content">/);
});

test('keeps the consultation form labelled and clear about its prototype state', () => {
  assert.match(html, /<label for="name">Nama<\/label>/);
  assert.match(html, /<textarea id="message"[^>]*required>/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /belum terhubung ke inbox/);
});

test('includes keyboard-safe navigation, responsive styling, and reduced-motion support', () => {
  assert.match(html, /aria-expanded="false" aria-controls="site-nav"/);
  assert.match(js, /menuButton\.setAttribute\('aria-expanded'/);
  assert.match(css, /@media \(max-width:850px\)/);
  assert.match(css, /@media \(prefers-reduced-motion:reduce\)/);
  assert.match(css, /:focus-visible/);
});
