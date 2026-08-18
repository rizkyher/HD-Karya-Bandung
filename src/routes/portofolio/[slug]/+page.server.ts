import { error } from '@sveltejs/kit';
import { getPublished } from '$lib/server/cms';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform, params }) => {
	const item = await getPublished(platform?.env, 'PROYEK', params.slug);
	if (!item) error(404, 'Portofolio tidak ditemukan');
	return { item };
};
