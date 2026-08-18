import { listPortfolioCovers, type ContentItem } from '$lib/server/cms';
import type { PageServerLoad } from './$types';

const pageSize = 6;
const fields = "c.id, c.kind, c.title, c.slug, c.category, c.summary, c.body, c.data, c.seo_title, c.meta_description, c.canonical_url, c.index_status, c.featured, c.published_at, c.updated_at, m.alt AS media_alt";

export const load: PageServerLoad = async ({ platform, url }) => {
	const env = platform?.env;
	if (!env) return { items: [] as ContentItem[], covers: [] as ContentItem[], categories: [] as string[], activeCategory: '', page: 1, pageCount: 1 };

	const categoryRows = await env.DB.prepare("SELECT DISTINCT category FROM content_items WHERE kind = 'PROYEK' AND status = 'PUBLISHED' AND TRIM(category) <> '' ORDER BY category").all<{ category: string }>();
	const categories = categoryRows.results.map((row) => row.category);
	const requestedCategory = url.searchParams.get('kategori')?.trim() ?? '';
	const activeCategory = categories.includes(requestedCategory) ? requestedCategory : '';
	const requestedPage = Number(url.searchParams.get('halaman'));
	const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
	const categoryClause = activeCategory ? ' AND c.category = ?' : '';
	const bindings = activeCategory ? [activeCategory] : [];
	const count = await env.DB.prepare(`SELECT COUNT(*) AS total FROM content_items c WHERE c.kind = 'PROYEK' AND c.status = 'PUBLISHED'${categoryClause}`).bind(...bindings).first<{ total: number }>();
	const pageCount = Math.max(1, Math.ceil(Number(count?.total ?? 0) / pageSize));
	const page = Math.min(currentPage, pageCount);
	const [items, covers] = await Promise.all([
		env.DB.prepare(`SELECT ${fields} FROM content_items c LEFT JOIN media m ON m.id = COALESCE(json_extract(c.data, '$.cover_media_id'), json_extract(c.data, '$.media_id')) WHERE c.kind = 'PROYEK' AND c.status = 'PUBLISHED'${categoryClause} ORDER BY c.featured DESC, c.published_at DESC LIMIT ? OFFSET ?`).bind(...bindings, pageSize, (page - 1) * pageSize).all<ContentItem>(),
		listPortfolioCovers(env)
	]);

	return { items: items.results, covers, categories, activeCategory, page, pageCount };
};
