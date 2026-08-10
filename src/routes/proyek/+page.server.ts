import { listPublished } from '$lib/server/cms';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ platform }) => ({ items: await listPublished(platform?.env, 'PROYEK') });
