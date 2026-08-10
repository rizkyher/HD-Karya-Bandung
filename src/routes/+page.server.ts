import { getHomepage, listPublished } from '$lib/server/cms';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => ({
  homepage: await getHomepage(platform?.env),
  services: await listPublished(platform?.env, 'LAYANAN', 4),
  projects: await listPublished(platform?.env, 'PROYEK', 2)
});
