import { fail, redirect } from '@sveltejs/kit';
import { audit, authenticate, createSession } from '$lib/server/auth';
import { cleanText } from '$lib/server/content.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
  if (locals.user) redirect(303, '/admin');
  return { next: url.searchParams.get('next')?.startsWith('/admin') ? url.searchParams.get('next') : '/admin' };
};

export const actions: Actions = {
  default: async ({ request, cookies, platform, getClientAddress, url }) => {
    const env = platform?.env;
    if (!env) return fail(503, { message: 'Layanan admin belum tersedia. Coba lagi sesaat lagi.' });
    const form = await request.formData();
    const email = cleanText(form.get('email'), 254).toLowerCase();
    const password = String(form.get('password') ?? '');
    const result = await authenticate(env, email, password, `${getClientAddress()}:${email}`);
    if (result.status === 'RATE_LIMITED') return fail(429, { message: 'Terlalu banyak percobaan. Coba lagi dalam 15 menit.', email });
    if (result.status === 'INVALID') return fail(401, { message: 'Email atau password tidak tepat.', email });
    const token = await createSession(env, result.user.id);
    await audit(env, result.user.id, 'LOGIN', 'USER', result.user.id, 'Login berhasil');
    cookies.set('hd_session', token, { path: '/', httpOnly: true, sameSite: 'lax', secure: url.protocol === 'https:', maxAge: 60 * 60 * 8 });
    const next = cleanText(form.get('next'), 300);
    redirect(303, next.startsWith('/admin') ? next : '/admin');
  }
};
