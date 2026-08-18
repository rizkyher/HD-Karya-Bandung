import { error } from '@sveltejs/kit';
import { findPortfolioCategory, getPublished, listPortfolioCategories, listPortfolioCategoryItems } from '$lib/server/cms';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ platform, params, url }) => {
	const category = findPortfolioCategory(params.slug);
	if (category) {
		const requestedPage = Number(url.searchParams.get('halaman'));
		const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
		const [portfolio, categories] = await Promise.all([
			listPortfolioCategoryItems(platform?.env, category.category, page),
			listPortfolioCategories(platform?.env)
		]);
		return { mode: 'category' as const, category, categories, ...portfolio };
	}

	const item = await getPublished(platform?.env, 'PROYEK', params.slug);
	if (!item) error(404, 'Portofolio tidak ditemukan');
	return { mode: 'item' as const, item };
};
