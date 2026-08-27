import assert from 'node:assert/strict';

const origin = new URL(process.argv[2] || 'https://hd-karya-bandung.hd-karya-bandung.workers.dev').origin;
const get = async (path) => {
  const response = await fetch(new URL(path, origin));
  assert.ok(response.ok, `${path} returned ${response.status}`);
  return { response, text: await response.text() };
};

const { text: sitemap } = await get('/sitemap.xml');
const pages = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const html = await Promise.all(pages.map(async (url) => (await get(url)).text));
const media = new Set(html.flatMap((page) => [...page.matchAll(/\/media\/[a-f0-9-]+/g)].map((match) => match[0])));

await Promise.all([...media].map(async (path) => {
  const response = await fetch(new URL(path, origin), { method: 'HEAD' });
  assert.ok(response.ok, `${path} returned ${response.status}`);
  assert.match(response.headers.get('content-type') || '', /^(image|application\/pdf)/, `${path} has an invalid content type`);
}));

for (const [legacy, target] of [['/proyek', '/portofolio'], ['/galeri', '/portofolio']]) {
  const response = await fetch(new URL(legacy, origin));
  assert.equal(new URL(response.url).pathname, target, `${legacy} did not redirect to ${target}`);
}

console.log(`Production check passed: ${pages.length} pages and ${media.size} media files.`);
