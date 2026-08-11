import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  if (!locals.user && url.pathname !== '/admin/login') redirect(303, `/admin/login?next=${encodeURIComponent(url.pathname)}`);
  return { user: locals.user };
};
