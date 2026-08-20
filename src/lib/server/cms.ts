import { contentKinds, parseData, routeForKind } from '../content.js';

export type ContentKind = keyof typeof contentKinds extends never ? never : (typeof contentKinds)[keyof typeof contentKinds];
export type ContentItem = {
  id: string; kind: ContentKind; title: string; slug: string; category: string; summary: string; body: string;
  data: string; seo_title: string | null; meta_description: string | null; canonical_url: string | null;
  index_status: string; featured: number; published_at: string | null; updated_at: string; media_alt: string | null;
};

export const portfolioCategories = [
  { slug: 'renovasi-pengecatan', category: 'Jasa Renovasi & Pengecatan Ulang', coverTitle: 'Basement DPRD Bandung', name: 'Renovasi & Pengecatan', description: 'Perbaikan ruang, pembaruan interior, dan pengecatan ulang untuk rumah, kantor, sekolah, tempat ibadah, serta fasilitas usaha.' },
  { slug: 'furniture-kayu', category: 'Jasa Perbaikan Lemari, Pintu, dan Meja Kayu', coverTitle: 'Buah Batu Regency', name: 'Furniture Kayu', description: 'Dokumentasi perbaikan lemari, pintu, meja, sofa pantry, dan furniture kayu lainnya.' },
  { slug: 'instalasi-listrik', category: 'Jasa Instalasi/Relokasi Listrik', coverTitle: 'Pasang Jalur HDMI', name: 'Instalasi & Relokasi Listrik', description: 'Pemasangan jalur, pembaruan instalasi, serta relokasi saklar dan stop kontak.' },
  { slug: 'kusen-aluminium', category: 'Pengerjaan Kusen Aluminium', coverTitle: 'PT. Pakar Biomedika Bandung', name: 'Kusen Aluminium', description: 'Pengerjaan kusen, pintu, jendela, dan partisi aluminium untuk berbagai jenis ruang.' },
  { slug: 'furniture-interior', category: 'Pengerjaan Furniture & Interior', coverTitle: 'Pengerjaan Furniture & Interior', name: 'Furniture & Interior', description: 'Pengerjaan furniture custom dan penataan interior yang disesuaikan dengan fungsi serta ukuran ruang.' },
  { slug: 'kaca-tempered', category: 'Pengerjaan Kaca Tempered', coverTitle: 'Pemasangan Kaca Tempered', name: 'Kaca Tempered', description: 'Pemasangan kaca tempered untuk pintu, partisi, etalase, dan kebutuhan ruang usaha.' },
  { slug: 'huruf-timbul-neonbox', category: 'Pengerjaan Huruf Timbul & Neonbox', coverTitle: 'Pengerjaan Huruf Timbul & Neon Box', name: 'Huruf Timbul & Neon Box', description: 'Pengerjaan identitas visual usaha berupa huruf timbul dan neon box.' },
  { slug: 'perbaikan-rumah-kantor', category: 'Jasa Perbaikan Rumah/Kantor', coverTitle: 'Jasa Perbaikan Rumah/Kantor', name: 'Perbaikan Rumah & Kantor', description: 'Perbaikan dan penataan ruang untuk rumah, kantor, serta tempat usaha.' }
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];
export type PortfolioMediaItem = ContentItem & { media_width: number | null; media_height: number | null };

export const contentSections = ['hero', 'about', 'services_home', 'projects_home', 'why_hd', 'process', 'final_cta'] as const;

export async function listPublished(env: Env | undefined, kind: ContentKind, limit = 24) {
  if (!env) return [] as ContentItem[];
  const rows = await env.DB.prepare("SELECT c.id, c.kind, c.title, c.slug, c.category, c.summary, c.body, c.data, c.seo_title, c.meta_description, c.canonical_url, c.index_status, c.featured, c.published_at, c.updated_at, m.alt AS media_alt FROM content_items c LEFT JOIN media m ON m.id = COALESCE(json_extract(c.data, '$.cover_media_id'), json_extract(c.data, '$.media_id'), json_extract(c.data, '$.photo_media_id'), json_extract(c.data, '$.logo_media_id'), json_extract(c.data, '$.image_media_id')) WHERE c.kind = ? AND c.status = 'PUBLISHED' ORDER BY c.featured DESC, c.published_at DESC LIMIT ?")
    .bind(kind, limit)
    .all<ContentItem>();
  return rows.results;
}

export async function listPortfolioCovers(env: Env | undefined) {
  if (!env) return [] as ContentItem[];
  const rows = await env.DB.prepare("SELECT c.id, c.kind, c.title, c.slug, c.category, c.summary, c.body, c.data, c.seo_title, c.meta_description, c.canonical_url, c.index_status, c.featured, c.published_at, c.updated_at, m.alt AS media_alt FROM content_items c LEFT JOIN media m ON m.id = json_extract(c.data, '$.cover_media_id') WHERE c.kind = 'PROYEK' AND c.status = 'PUBLISHED' AND json_extract(c.data, '$.portfolio_cover') = 1")
    .all<ContentItem>();
  return rows.results;
}

export async function listPortfolioCategories(env: Env | undefined) {
  if (!env) return [];
  const [covers, counts] = await Promise.all([
    listPortfolioCovers(env),
    env.DB.prepare("SELECT category, COUNT(*) AS total FROM content_items WHERE kind = 'PROYEK' AND status = 'PUBLISHED' GROUP BY category").all<{ category: string; total: number }>()
  ]);
  const countByCategory = new Map(counts.results.map((row) => [row.category, Number(row.total)]));
  return portfolioCategories.flatMap((category) => {
    const cover = covers.find((item) => item.title === category.coverTitle);
    if (!cover) return [];
    return [{ ...category, cover, itemCount: countByCategory.get(category.category) ?? 0 }];
  });
}

export function findPortfolioCategory(slug: string) {
  return portfolioCategories.find((category) => category.slug === slug);
}

export async function listPortfolioCategoryItems(env: Env | undefined, category: string, page: number, pageSize = 8) {
  if (!env) return { items: [] as PortfolioMediaItem[], total: 0, pageCount: 1, page: 1 };
  const count = await env.DB.prepare("SELECT COUNT(*) AS total FROM content_items WHERE kind = 'PROYEK' AND status = 'PUBLISHED' AND category = ?").bind(category).first<{ total: number }>();
  const total = Number(count?.total ?? 0);
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), pageCount);
  const rows = await env.DB.prepare("SELECT c.id, c.kind, c.title, c.slug, c.category, c.summary, c.body, c.data, c.seo_title, c.meta_description, c.canonical_url, c.index_status, c.featured, c.published_at, c.updated_at, m.alt AS media_alt, m.width AS media_width, m.height AS media_height FROM content_items c LEFT JOIN media m ON m.id = COALESCE(json_extract(c.data, '$.cover_media_id'), json_extract(c.data, '$.media_id')) WHERE c.kind = 'PROYEK' AND c.status = 'PUBLISHED' AND c.category = ? ORDER BY c.featured DESC, c.published_at DESC LIMIT ? OFFSET ?")
    .bind(category, pageSize, (currentPage - 1) * pageSize)
    .all<PortfolioMediaItem>();
  return { items: rows.results, total, pageCount, page: currentPage };
}

export async function listPortfolioServices(env: Env | undefined) {
  if (!env) return [] as ContentItem[];
  const rows = await env.DB.prepare("SELECT c.id, c.kind, c.title, c.slug, c.category, c.summary, c.body, c.data, c.seo_title, c.meta_description, c.canonical_url, c.index_status, c.featured, c.published_at, c.updated_at, m.alt AS media_alt FROM content_items c LEFT JOIN media m ON m.id = json_extract(c.data, '$.cover_media_id') WHERE c.kind = 'LAYANAN' AND c.status = 'PUBLISHED' AND c.slug IN ('renovasi-pengecatan-ulang', 'perbaikan-lemari-kayu', 'instalasi-relokasi-listrik', 'kusen-aluminium') ORDER BY CASE c.slug WHEN 'renovasi-pengecatan-ulang' THEN 1 WHEN 'perbaikan-lemari-kayu' THEN 2 WHEN 'instalasi-relokasi-listrik' THEN 3 WHEN 'kusen-aluminium' THEN 4 ELSE 5 END")
    .all<ContentItem>();
  return rows.results;
}

export async function getPublished(env: Env | undefined, kind: ContentKind, slug: string) {
  if (!env) return null;
  return env.DB.prepare("SELECT c.id, c.kind, c.title, c.slug, c.category, c.summary, c.body, c.data, c.seo_title, c.meta_description, c.canonical_url, c.index_status, c.featured, c.published_at, c.updated_at, m.alt AS media_alt FROM content_items c LEFT JOIN media m ON m.id = COALESCE(json_extract(c.data, '$.cover_media_id'), json_extract(c.data, '$.media_id'), json_extract(c.data, '$.photo_media_id'), json_extract(c.data, '$.logo_media_id'), json_extract(c.data, '$.image_media_id')) WHERE c.kind = ? AND c.slug = ? AND c.status = 'PUBLISHED'")
    .bind(kind, slug)
    .first<ContentItem>();
}

export async function getSettings(env: Env | undefined) {
  if (!env) return {} as Record<string, string>;
  const rows = await env.DB.prepare('SELECT key, value FROM site_settings').all<{ key: string; value: string }>();
  return Object.fromEntries(rows.results.map((row) => [row.key, row.value]));
}

export async function getHomepage(env: Env | undefined) {
  if (!env) return {} as Record<string, Record<string, string>>;
  const rows = await env.DB.prepare("SELECT key, data FROM page_content WHERE status = 'PUBLISHED' AND active = 1").all<{ key: string; data: string }>();
  return Object.fromEntries(rows.results.map((row) => [row.key, parseData(row.data)]));
}

export function itemData(item: ContentItem) {
  return parseData(item.data) as Record<string, string>;
}

export function publicPath(item: Pick<ContentItem, 'kind' | 'slug'>) {
  return `/${routeForKind(item.kind)}/${item.slug}`;
}

export function plainParagraphs(value: string) {
  return String(value || '').split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
}
