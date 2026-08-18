import { redirect } from '@sveltejs/kit';
import { listPortfolioCategories, portfolioCategories } from '$lib/server/cms';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform, url }) => {
	const requestedCategory = url.searchParams.get('kategori')?.trim();
	if (requestedCategory) {
		const category = portfolioCategories.find((item) => item.category === requestedCategory);
		if (category) {
			const page = url.searchParams.get('halaman');
			throw redirect(301, `/portofolio/${category.slug}${page && page !== '1' ? `?halaman=${encodeURIComponent(page)}` : ''}`);
		}
	}

	return { categories: await listPortfolioCategories(platform?.env) };
};
