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
    '../src/routes/portofolio/+page.svelte',
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
  assert.match(tutorial, /mobileSelector: 'header details > summary'/);
  assert.match(tutorial, /max-h-\[52dvh\]/);
  assert.match(tutorial, /window\.scrollBy/);
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

test('lets admins select an uploaded project photo for the homepage hero', () => {
  const adminPage = read('../src/routes/admin/[module]/+page.svelte');
  const adminActions = read('../src/routes/admin/[module]/+page.server.ts');
  const home = read('../src/routes/+page.svelte');
  assert.match(adminPage, /name="hero_media_id"/);
  assert.match(adminPage, /MediaPicker/);
  assert.match(adminActions, /hero_media_id/);
  assert.match(adminActions, /page_content.*json_extract\(data, '\$\.media_id'\)/);
  assert.match(home, /\/media\/\$\{hero\.media_id\}/);
  assert.match(home, /hero\.media_alt/);
});

test('keeps every public destination in the shared navigation', () => {
  const shell = read('../src/lib/components/PublicShell.svelte');
  for (const route of ['/layanan', '/portofolio', '/artikel', '/tentang-kami']) {
    assert.match(shell, new RegExp(route));
  }
  assert.match(shell, /\['\/portofolio', 'Portofolio'\]/);
  assert.doesNotMatch(shell, /\['\/proyek', 'Proyek'\]/);
  assert.doesNotMatch(shell, /\['\/galeri', 'Galeri'\]/);
  assert.match(shell, /import \{ page \} from '\$app\/state'/);
  assert.match(shell, /aria-current=\{isActive\(link\[0\]\) \? 'page' : undefined\}/);
  assert.match(shell, /page\.url\.pathname\.startsWith\(`\$\{href\}\/`\)/);
  assert.match(shell, /href="\/kontak"[^>]*>Kontak <span/);
  assert.match(shell, /button-primary mt-2" href="\/kontak"[^>]*>Konsultasi gratis/);
});

test('publishes trust content without adding broken detail URLs to the sitemap', () => {
  for (const route of ['testimoni', 'mitra', 'sertifikasi']) {
    assert.ok(existsSync(new URL(`../src/routes/${route}/+page.svelte`, import.meta.url)));
    assert.ok(existsSync(new URL(`../src/routes/${route}/+page.server.ts`, import.meta.url)));
  }
  assert.match(read('../src/routes/sitemap.xml/+server.ts'), /kind IN \('LAYANAN', 'PROYEK', 'ARTIKEL'\)/);
});

test('links published portfolio entries to their dedicated detail pages', () => {
  const grid = read('../src/lib/components/ContentGrid.svelte');
  assert.match(grid, /item\.kind !== 'GALERI'/);
  assert.match(read('../src/lib/content.js'), /portofolio:\s*'PROYEK'/);
  assert.match(read('../src/lib/content.js'), /PROYEK:\s*'Portofolio'/);
  assert.match(grid, /\{#if item\.kind !== 'GALERI'\}/);
});

test('organizes and paginates portfolio entries through category URLs', () => {
  const landingLoader = read('../src/routes/portofolio/+page.server.ts');
  const categoryLoader = read('../src/routes/portofolio/[slug]/+page.server.ts');
  const categoryPage = read('../src/routes/portofolio/[slug]/+page.svelte');
  const cms = read('../src/lib/server/cms.ts');
  assert.match(landingLoader, /url\.searchParams\.get\('kategori'\)/);
  assert.match(landingLoader, /url\.searchParams\.get\('halaman'\)/);
  assert.match(categoryLoader, /url\.searchParams\.get\('halaman'\)/);
  assert.match(cms, /LIMIT \? OFFSET \?/);
  assert.match(categoryPage, /Halaman \{data\.page\} dari \{data\.pageCount\}/);
  assert.match(categoryPage, /data\.page - 1/);
  assert.match(categoryPage, /data\.page \+ 1/);
  assert.match(read('../src/lib/components/PortfolioGallery.svelte'), /h-auto w-full/);
  assert.match(read('../src/lib/components/PortfolioLightbox.svelte'), /object-contain/);
});

test('keeps portfolio canonicals on the active deployment origin', () => {
  const landing = read('../src/routes/portofolio/+page.svelte');
  const detail = read('../src/routes/portofolio/[slug]/+page.svelte');
  assert.match(landing, /rel="canonical" href="\/portofolio"/);
  assert.match(detail, /rel="canonical" href=\{`\/portofolio\/\$\{data\.category\.slug\}`\}/);
  assert.doesNotMatch(landing + detail, /jasaperbaikanbandung\.com/);
});

test('permanently redirects legacy project and gallery URLs while keeping query parameters', () => {
  assert.match(read('../src/routes/proyek/+page.server.ts'), /redirect\(308, `\/portofolio\$\{url\.search\}`\)/);
  assert.match(read('../src/routes/galeri/+page.server.ts'), /redirect\(308, `\/portofolio\$\{url\.search\}`\)/);
  assert.match(read('../src/routes/proyek/[slug]/+page.server.ts'), /redirect\(308, `\/portofolio\/\$\{params\.slug\}`\)/);
});

test('selects one real cover for each portfolio category and applies it to matching services', () => {
  const migration = read('../migrations/0007_portfolio_rebrand.sql');
  const cms = read('../src/lib/server/cms.ts');
  const homeLoader = read('../src/routes/+page.server.ts');
  for (const title of ['Basement DPRD Bandung', 'Buah Batu Regency', 'Pasang Jalur HDMI', 'PT. Pakar Biomedika Bandung']) {
    assert.match(migration, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  for (const slug of ['renovasi-pengecatan-ulang', 'perbaikan-lemari-kayu', 'instalasi-relokasi-listrik', 'kusen-aluminium']) {
    assert.match(migration, new RegExp(slug));
  }
  assert.match(migration, /portfolio_cover/);
  assert.match(migration, /portfolio_category/);
  assert.match(migration, /cover_media_id/);
  assert.match(cms, /listPortfolioServices/);
  assert.match(homeLoader, /listPortfolioServices/);
});

test('publishes the latest service covers as portfolio categories', () => {
  const migration = read('../migrations/0010_add_service_covers_to_portfolio.sql');
  const cms = read('../src/lib/server/cms.ts');
  for (const title of ['Pengerjaan Furniture & Interior', 'Pemasangan Kaca Tempered', 'Pengerjaan Huruf Timbul & Neon Box', 'Jasa Perbaikan Rumah/Kantor']) {
    assert.match(migration, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  for (const category of ['Pengerjaan Furniture & Interior', 'Pengerjaan Kaca Tempered', 'Pengerjaan Huruf Timbul & Neonbox']) {
    assert.match(cms, new RegExp(category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(cms, /json_extract\(c\.data, '\$\.portfolio_cover'\) = 1/);
  assert.match(migration, /portfolio_category/);
});

test('groups home and office repairs under renovation while using its photo as the renovation cover', () => {
  const migration = read('../migrations/0011_merge_home_office_repairs_into_renovation.sql');
  const cms = read('../src/lib/server/cms.ts');
  const detailRoute = read('../src/routes/portofolio/[slug]/+page.server.ts');
  assert.match(migration, /jasa-perbaikan-rumah-kantor/);
  assert.match(migration, /Jasa Renovasi & Pengecatan Ulang/);
  assert.match(migration, /Basement DPRD Bandung/);
  assert.match(migration, /'\$\.portfolio_cover', 0/);
  assert.match(cms, /covers\.find\(\(item\) => item\.category === category\.category\)/);
  assert.doesNotMatch(cms, /coverTitle/);
  assert.doesNotMatch(cms, /slug: 'perbaikan-rumah-kantor'/);
  assert.match(detailRoute, /params\.slug === 'perbaikan-rumah-kantor'[\s\S]*redirect\(308, `\/portofolio\/renovasi-pengecatan\$\{url\.search\}`\)/);
});

test('repairs portfolio media references without keeping duplicate broken entries', () => {
  const migration = read('../migrations/0012_repair_portfolio_media.sql');
  const sizes = read('../migrations/0013_sync_optimized_media_sizes.sql');
  for (const mediaId of [
    'd3197762-b7c4-49aa-bed8-fb6f3422ff9a',
    'acf726a3-d17a-4050-ae3c-7b7a6b167c80',
    '987d5f5e-452e-46d0-aa21-6a3d28cc37df'
  ]) assert.match(migration, new RegExp(mediaId));
  for (const slug of [
    'rs-imannuel-bandung',
    'rs-imannuel-bandung-koridor',
    'pt-daya-mulia-turangga-aluminium'
  ]) assert.match(migration, new RegExp(`status = 'ARCHIVED'[\\s\\S]*${slug}`));
  assert.match(sizes, /3adc52e7-def0-42bc-8413-bc0ec5879dc3'[\s\S]*116514/);
});

test('keeps the desktop admin navigation independently scrollable', () => {
  const shell = read('../src/lib/components/AdminShell.svelte');
  assert.match(shell, /overflow-y: auto/);
  assert.match(shell, /overscroll-behavior: contain/);
  assert.match(shell, /height: 100dvh/);
});

test('keeps production safeguards and automation in the repository', () => {
  assert.match(read('../src/hooks.server.ts'), /Strict-Transport-Security/);
  assert.match(read('../src/app.html'), /rel="icon"/);
  assert.ok(existsSync(new URL('../src/routes/favicon.ico/+server.ts', import.meta.url)));
  const workflow = read('../.github/workflows/ci.yml');
  for (const command of ['npm ci', 'npm test', 'npm run check', 'npm run build', 'npm audit --omit=dev']) assert.match(workflow, new RegExp(command.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('shares a polished visual foundation across public pages', () => {
  assert.ok(existsSync(new URL('../src/lib/components/PageIntro.svelte', import.meta.url)));
  assert.match(read('../src/app.css'), /--ease-out-expo/);
  assert.match(read('../src/lib/components/PublicShell.svelte'), /backdrop-blur/);
  assert.match(read('../src/lib/components/ContentGrid.svelte'), /group-hover:scale/);
  for (const route of ['layanan', 'portofolio', 'artikel']) {
    assert.match(read(`../src/routes/${route}/+page.svelte`), /PageIntro/);
  }
  assert.match(read('../src/routes/kontak/+page.svelte'), /field-input/);
});

test('shows the complete navigation on wide screens and offers a back-to-top control', () => {
  const shell = read('../src/lib/components/PublicShell.svelte');
  assert.match(shell, /<header[^>]*class="[^"]*sticky/);
  assert.match(shell, /hidden items-center gap-4 text-sm font-bold xl:flex/);
  assert.match(shell, /\{#each \[\.\.\.links, \.\.\.proofLinks\] as link\}/);
  assert.match(shell, /aria-controls="mobile-navigation"/);
  assert.match(shell, /aria-label="Kembali ke atas"/);
  assert.match(shell, /href="#content"/);
});

test('uses one accessible scroll owner and keeps contact actions reachable on mobile', () => {
  assert.ok(existsSync(new URL('../src/lib/components/SmoothScroll.svelte', import.meta.url)));
  const smoothScroll = read('../src/lib/components/SmoothScroll.svelte');
  const layout = read('../src/routes/+layout.svelte');
  const shell = read('../src/lib/components/PublicShell.svelte');

  assert.match(smoothScroll, /import Lenis from 'lenis'/);
  assert.match(smoothScroll, /autoRaf: true/);
  assert.match(smoothScroll, /anchors:/);
  assert.match(smoothScroll, /lenis\.destroy\(\)/);
  assert.match(layout, /SmoothScroll/);
  assert.match(shell, /aria-expanded=\{menuOpen\}/);
  assert.match(shell, /data-lenis-prevent/);
  assert.match(shell, /mobile-action-dock/);
  assert.match(shell, /Chat WhatsApp/);
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

test('rebrands homepage portfolio content and keeps sitemap URLs canonical', () => {
  const home = read('../src/routes/+page.svelte');
  const sitemap = read('../src/routes/sitemap.xml/+server.ts');
  assert.match(home, /Lihat portofolio/);
  assert.match(home, /Portofolio Kami/);
  assert.match(home, /href="\/portofolio"/);
  assert.doesNotMatch(home, /Dokumentasi proyek/);
  assert.match(sitemap, /'\/portofolio'/);
  assert.doesNotMatch(sitemap, /'\/proyek'/);
  assert.doesNotMatch(sitemap, /'\/galeri'/);
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
