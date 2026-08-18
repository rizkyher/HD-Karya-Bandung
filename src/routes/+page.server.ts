import { getHomepage, listPortfolioCovers, listPortfolioServices } from '$lib/server/cms';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => ({
  homepage: await getHomepage(platform?.env),
  services: await listPortfolioServices(platform?.env),
  projects: await listPortfolioCovers(platform?.env)
});
