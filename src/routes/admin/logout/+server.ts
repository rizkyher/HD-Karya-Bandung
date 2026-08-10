import { redirect, type RequestHandler } from '@sveltejs/kit';
import { sha256 } from '$lib/server/auth';

export const POST: RequestHandler = async ({ cookies, platform }) => {
  const token = cookies.get('hd_session');
  if (token && platform?.env) await platform.env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await sha256(token)).run();
  cookies.delete('hd_session', { path: '/' });
  redirect(303, '/admin/login');
};
