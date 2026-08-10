import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { archiveContent, assertModuleAccess, fieldSets, kindFor, labelFor, parseData, saveContent } from '$lib/server/admin';
import { audit } from '$lib/server/auth';
import { cleanText } from '$lib/content.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, platform, locals }) => {
  const user = locals.user!;
  assertModuleAccess(user, params.module);
  const env = platform?.env;
  if (!env) error(503, 'Admin belum tersedia.');
  const kind = kindFor(params.module);
  if (kind) {
    const item = params.id === 'baru' ? null : await env.DB.prepare('SELECT * FROM content_items WHERE id = ? AND kind = ?').bind(params.id, kind).first<Record<string, unknown>>();
    if (params.id !== 'baru' && !item) error(404, 'Konten tidak ditemukan.');
    return { mode: 'content' as const, module: params.module, kind, title: `${params.id === 'baru' ? 'Tambah' : 'Edit'} ${labelFor(kind)}`, item: item ? { ...item, data: parseData(item.data) } : null, fields: fieldSets[kind] ?? [] };
  }
  if (params.module === 'pesan-masuk') { const item = await env.DB.prepare('SELECT * FROM inquiries WHERE id = ?').bind(params.id).first<Record<string, unknown>>(); if (!item) error(404, 'Inquiry tidak ditemukan.'); return { mode: 'inquiry' as const, module: params.module, title: 'Detail inquiry', item, fields: [] }; }
  error(404, 'Halaman tidak ditemukan.');
};

export const actions: Actions = {
  save: async ({ request, params, platform, locals }) => { const env = platform?.env; const module = params.module ?? ''; const id = params.id ?? ''; const kind = kindFor(module); if (!env || !kind) return fail(404); assertModuleAccess(locals.user!, module); const result = await saveContent(env, locals.user!, kind, await request.formData(), id === 'baru' ? undefined : id); if ('error' in result) return fail(422, result); redirect(303, `/admin/${module}`); },
  archive: async ({ params, platform, locals }) => { const env = platform?.env; const module = params.module ?? ''; const id = params.id ?? ''; const kind = kindFor(module); if (!env || !kind || id === 'baru') return fail(404); assertModuleAccess(locals.user!, module); await archiveContent(env, locals.user!, kind, id); redirect(303, `/admin/${module}`); },
  updateInquiry: async ({ request, params, platform, locals }) => { const env = platform?.env; const module = params.module ?? ''; const id = params.id ?? ''; if (!env || module !== 'pesan-masuk' || !id) return fail(404); assertModuleAccess(locals.user!, module); const form = await request.formData(); const status = cleanText(form.get('status'), 20); if (!['NEW','CONTACTED','QUALIFIED','CLOSED','SPAM'].includes(status)) return fail(422, { error: 'Status tidak valid.' }); await env.DB.prepare('UPDATE inquiries SET status = ?, internal_note = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(status, cleanText(form.get('internal_note'), 3000), id).run(); await audit(env, locals.user!.id, 'UPDATE_STATUS', 'INQUIRY', id, `Status inquiry menjadi ${status}`); return { saved: true }; }
};
