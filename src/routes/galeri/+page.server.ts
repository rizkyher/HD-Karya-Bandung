import type { ContentItem } from '$lib/server/cms';
import type { PageServerLoad } from './$types';

const pageSize = 9;
const fields = "c.id, c.kind, c.title, c.slug, c.category, c.summary, c.body, c.data, c.seo_title, c.meta_description, c.canonical_url, c.index_status, c.featured, c.published_at, c.updated_at, m.alt AS media_alt";

export const load: PageServerLoad = async ({ platform, url }) => {
  const env = platform?.env;
  if (!env) return { items: [] as ContentItem[], categories: [] as string[], activeCategory: '', page: 1, pageCount: 1 };

  const categoryRows = await env.DB.prepare("SELECT DISTINCT category FROM content_items WHERE kind = 'GALERI' AND status = 'PUBLISHED' AND TRIM(category) <> '' ORDER BY category").all<{ category: string }>();
  const categories = categoryRows.results.map((row) => row.category);
  const requestedCategory = url.searchParams.get('kategori')?.trim() ?? '';
  const activeCategory = categories.includes(requestedCategory) ? requestedCategory : '';
  const requestedPage = Number(url.searchParams.get('halaman'));
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const categoryClause = activeCategory ? ' AND c.category = ?' : '';
  const count = await env.DB.prepare(`SELECT COUNT(*) AS total FROM content_items c WHERE c.kind = 'GALERI' AND c.status = 'PUBLISHED'${categoryClause}`).bind(...(activeCategory ? [activeCategory] : [])).first<{ total: number }>();
  const pageCount = Math.max(1, Math.ceil(Number(count?.total ?? 0) / pageSize));
  const page = Math.min(currentPage, pageCount);
  const items = await env.DB.prepare(`SELECT ${fields} FROM content_items c LEFT JOIN media m ON m.id = COALESCE(json_extract(c.data, '$.cover_media_id'), json_extract(c.data, '$.media_id'), json_extract(c.data, '$.photo_media_id'), json_extract(c.data, '$.logo_media_id'), json_extract(c.data, '$.image_media_id')) WHERE c.kind = 'GALERI' AND c.status = 'PUBLISHED'${categoryClause} ORDER BY c.featured DESC, c.published_at DESC LIMIT ? OFFSET ?`)
    .bind(...(activeCategory ? [activeCategory, pageSize, (page - 1) * pageSize] : [pageSize, (page - 1) * pageSize]))
    .all<ContentItem>();

  return { items: items.results, categories, activeCategory, page, pageCount };
};
