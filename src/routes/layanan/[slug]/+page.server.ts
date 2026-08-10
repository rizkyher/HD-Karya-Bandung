import { error } from '@sveltejs/kit';
import { getPublished } from '$lib/server/cms';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ platform, params }) => { const item = await getPublished(platform?.env, 'LAYANAN', params.slug); if (!item) error(404, 'Layanan tidak ditemukan'); return { item }; };
