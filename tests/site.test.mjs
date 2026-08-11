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

test('lets SvelteKit nonce its client scripts under the site CSP', () => {
  const config = read('../svelte.config.js');
  const hooks = read('../src/hooks.server.ts');
  assert.match(config, /csp:\s*\{/);
  assert.match(config, /mode:\s*'auto'/);
  assert.match(config, /'script-src':\s*\['self'\]/);
  assert.doesNotMatch(hooks, /Content-Security-Policy/);
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

test('renders the login page outside the authenticated admin shell', () => {
  assert.match(read('../src/routes/admin/+layout.server.ts'), /url\.pathname !== '\/admin\/login'/);
  assert.match(read('../src/routes/admin/+layout.svelte'), /\{#if data\.user\}/);
  assert.match(read('../src/routes/admin/+layout.svelte'), /\{:else\}\{@render children\(\)\}/);
});

test('provides an interactive admin tutorial with step navigation', () => {
  const dashboard = read('../src/routes/admin/+page.svelte');
  const dashboardLoad = read('../src/routes/admin/+page.server.ts');
  assert.match(dashboard, /Mulai tutorial/);
  assert.match(dashboardLoad, /url\.searchParams\.get\('tutorial'\)/);
  assert.match(dashboard, /data\.tutorialStep/);
  assert.match(dashboard, /Langkah \{data\.tutorialStep\} dari \{tutorialSteps\.length\}/);
  assert.match(dashboard, />Sebelumnya</);
  assert.match(dashboard, /Selanjutnya/);
  assert.doesNotMatch(dashboard, /\$state/);
});

test('guides admins through menus and fields with a visual tour', () => {
  assert.ok(existsSync(new URL('../src/lib/components/AdminTutorial.svelte', import.meta.url)));
  assert.match(read('../src/lib/components/AdminShell.svelte'), /AdminTutorial/);
  assert.match(read('../src/routes/admin/+page.svelte'), /\?tutorial=1/);
  const tutorial = read('../src/lib/components/AdminTutorial.svelte');
  assert.match(tutorial, /goto\(/);
  assert.match(tutorial, /box-shadow: 0 0 0 100vmax/);
  assert.match(tutorial, /input\[name="company_name"\]/);
  assert.match(tutorial, /textarea\[name="summary"\]/);
});

test('lets editors select uploaded media and shows it on public content', () => {
  const admin = read('../src/lib/server/admin.ts');
  const editor = read('../src/routes/admin/[module]/[id]/+page.svelte');
  const grid = read('../src/lib/components/ContentGrid.svelte');
  const detail = read('../src/lib/components/ContentDetail.svelte');
  const mediaLibrary = read('../src/routes/admin/[module]/+page.svelte');
  assert.match(admin, /cover_media_id/);
  assert.match(editor, /MediaPicker/);
  assert.match(grid, /\/media\/\$\{mediaId\}/);
  assert.match(detail, /\/media\/\$\{mediaId\}/);
  assert.match(mediaLibrary, /\/media\/\$\{row\.id\}/);
});

test('keeps every public destination in the shared navigation', () => {
  const shell = read('../src/lib/components/PublicShell.svelte');
  for (const route of ['/layanan', '/proyek', '/galeri', '/artikel', '/tentang-kami']) {
    assert.match(shell, new RegExp(route));
  }
  assert.match(shell, /\['\/galeri', 'Galeri'\]/);
  assert.match(shell, /import \{ page \} from '\$app\/state'/);
  assert.match(shell, /aria-current=\{isActive\(link\[0\]\) \? 'page' : undefined\}/);
  assert.match(shell, /page\.url\.pathname\.startsWith\(`\$\{href\}\/`\)/);
  assert.match(shell, /href="\/kontak"[^>]*>Kontak <span/);
  assert.match(shell, /button-primary mt-2" href="\/kontak"[^>]*>Kontak<\/a>/);
});

test('shares a polished visual foundation across public pages', () => {
  assert.ok(existsSync(new URL('../src/lib/components/PageIntro.svelte', import.meta.url)));
  assert.match(read('../src/app.css'), /--ease-out-expo/);
  assert.match(read('../src/lib/components/PublicShell.svelte'), /backdrop-blur/);
  assert.match(read('../src/lib/components/ContentGrid.svelte'), /group-hover:scale/);
  for (const route of ['layanan', 'proyek', 'artikel', 'galeri']) {
    assert.match(read(`../src/routes/${route}/+page.svelte`), /PageIntro/);
  }
  assert.match(read('../src/routes/kontak/+page.svelte'), /field-input/);
});

test('keeps mobile navigation visible and offers a back-to-top control', () => {
  const shell = read('../src/lib/components/PublicShell.svelte');
  assert.match(shell, /<header[^>]*class="[^"]*sticky/);
  assert.match(shell, /aria-label="Kembali ke atas"/);
  assert.match(shell, /href="#content"/);
});

test('ships clearly labeled dummy visuals for public content states', () => {
  const grid = read('../src/lib/components/ContentGrid.svelte');
  for (const asset of [
    'dummy-renovation.webp',
    'dummy-house.webp',
    'dummy-interior.webp',
    'dummy-materials.webp'
  ]) {
    assert.ok(existsSync(new URL(`../static/assets/${asset}`, import.meta.url)), `${asset} should exist`);
    assert.match(grid, new RegExp(asset));
  }
  assert.match(grid, /Foto ilustrasi sementara/);
});

test('seeds the company profile service catalog without inventing portfolio entries', () => {
  const seed = read('../migrations/0002_company_profile_content.sql');
  for (const title of [
    'Jasa Perbaikan Rumah/Kantor',
    'Jasa Renovasi & Pengecatan Ulang',
    'Jasa Perbaikan Lemari Kayu',
    'Jasa Instalasi/Relokasi Listrik',
    'Jasa Instalasi AC & CCTV',
    'Pengerjaan Kusen Aluminium',
    'Pengerjaan Kaca Tempered',
    'Pengerjaan Huruf Timbul & Neonbox',
    'Pengerjaan Stainless Steel & Besi',
    'Pengerjaan Furniture & Interior',
    'Pengerjaan Kaca Grafir, Etsa, dan Inlay'
  ]) assert.match(seed, new RegExp(title));
  assert.match(seed, /INSERT INTO page_content/);
  assert.match(read('../migrations/0003_shorten_hero_title.sql'), /Perbaikan & renovasi di Bandung\./);
  assert.match(read('../src/routes/tentang-kami/+page.svelte'), /mitra profesional/);
  assert.match(read('../src/routes/kontak/+page.svelte'), /Jasa Instalasi AC & CCTV/);
});
