import type { Handle } from '@sveltejs/kit';
import { currentUser } from '$lib/server/auth';

const securityHeaders = {
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; img-src 'self' data: https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; frame-src https://www.google.com; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"
};

export const handle: Handle = async ({ event, resolve }) => {
  const env = event.platform?.env;
  if (env) {
    const redirect = await env.DB.prepare('SELECT to_path, status_code FROM redirects WHERE from_path = ?').bind(event.url.pathname).first<{ to_path: string; status_code: number }>();
    if (redirect) return Response.redirect(new URL(redirect.to_path, event.url).toString(), redirect.status_code as 301 | 302 | 303 | 307 | 308);
    event.locals.user = await currentUser(env, event.cookies.get('hd_session'));
  } else {
    event.locals.user = null;
  }
  const response = await resolve(event);
  for (const [name, value] of Object.entries(securityHeaders)) response.headers.set(name, value);
  return response;
};
