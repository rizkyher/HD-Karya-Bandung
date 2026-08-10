import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const html = readFileSync(new URL('../public/index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../public/styles.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../public/script.js', import.meta.url), 'utf8');
const worker = readFileSync(new URL('../src/index.ts', import.meta.url), 'utf8');

test('exposes a labelled main landmark and a single primary heading', () => {
  assert.match(html, /<main id="content">/);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
  assert.match(html, /<a class="skip-link" href="#content">/);
});

test('submits the labelled consultation form to the persistent inquiry endpoint', () => {
  assert.match(html, /<label for="name">Nama<\/label>/);
  assert.match(html, /<textarea id="message"[^>]*required>/);
  assert.match(html, /action="\/api\/inquiries"/);
  assert.match(html, /name="service"/);
  assert.doesNotMatch(html, /belum terhubung ke inbox/);
});

test('includes keyboard-safe navigation, responsive styling, and reduced-motion support', () => {
  assert.match(html, /aria-expanded="false" aria-controls="site-nav"/);
  assert.match(js, /menuButton\.setAttribute\('aria-expanded'/);
  assert.match(css, /@media \(max-width:850px\)/);
  assert.match(css, /@media \(prefers-reduced-motion:reduce\)/);
  assert.match(css, /:focus-visible/);
});

test('links the primary navigation and CTAs to standalone public pages', () => {
  for (const path of ['/tentang-kami', '/layanan', '/proyek', '/artikel', '/kontak']) {
    assert.match(html, new RegExp(`href="${path}"`));
  }
  assert.doesNotMatch(html, /href="#layanan"/);
  assert.doesNotMatch(html, /href="#proyek"/);
  assert.doesNotMatch(html, /href="#kontak"/);
});

test('renders distinct CMS-backed landing pages for services, projects, and articles', () => {
  assert.match(worker, /function serviceListing/);
  assert.match(worker, /function projectListing/);
  assert.match(worker, /function articleListing/);
  assert.match(worker, /Jasa konstruksi dan renovasi yang dimulai dari kebutuhan ruang/);
  assert.match(worker, /Dokumentasi proyek yang dapat ditelusuri dari konteks hingga hasil/);
  assert.match(worker, /Catatan praktis untuk membantu Anda mengambil keputusan ruang/);
});

test('renders content-type detail sections from the saved CMS data', () => {
  assert.match(worker, /function serviceDetail/);
  assert.match(worker, /function projectDetail/);
  assert.match(worker, /function articleDetail/);
  assert.match(worker, /FAQ layanan/);
  assert.match(worker, /Tantangan proyek/);
  assert.match(worker, /Estimasi waktu baca/);
  assert.match(worker, /function relatedContent/);
  assert.match(worker, /BreadcrumbList/);
});
