import { contentKinds, parseData, routeForKind } from '../content.js';

export type ContentKind = keyof typeof contentKinds extends never ? never : (typeof contentKinds)[keyof typeof contentKinds];
export type ContentItem = {
  id: string; kind: ContentKind; title: string; slug: string; category: string; summary: string; body: string;
  data: string; seo_title: string | null; meta_description: string | null; canonical_url: string | null;
  index_status: string; featured: number; published_at: string | null; updated_at: string; media_alt: string | null;
};

export const contentSections = ['hero', 'about', 'services_home', 'projects_home', 'why_hd', 'process', 'final_cta'] as const;

export async function listPublished(env: Env | undefined, kind: ContentKind, limit = 24) {
  if (!env) return [] as ContentItem[];
  const rows = await env.DB.prepare("SELECT c.id, c.kind, c.title, c.slug, c.category, c.summary, c.body, c.data, c.seo_title, c.meta_description, c.canonical_url, c.index_status, c.featured, c.published_at, c.updated_at, m.alt AS media_alt FROM content_items c LEFT JOIN media m ON m.id = COALESCE(json_extract(c.data, '$.cover_media_id'), json_extract(c.data, '$.media_id'), json_extract(c.data, '$.photo_media_id'), json_extract(c.data, '$.logo_media_id'), json_extract(c.data, '$.image_media_id')) WHERE c.kind = ? AND c.status = 'PUBLISHED' ORDER BY c.featured DESC, c.published_at DESC LIMIT ?")
    .bind(kind, limit)
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
