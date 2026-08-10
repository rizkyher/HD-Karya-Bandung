import { error } from '@sveltejs/kit';
import { audit, type AdminUser } from './auth';
import { cleanText, contentKinds, contentLabels, isSafeSlug, parseData, routeForKind } from '$lib/content.js';

export const editableModules = contentKinds as Record<string, string>;
export const fieldSets: Record<string, Array<{ key: string; label: string; multiline?: boolean }>> = {
  LAYANAN: [{ key: 'suitable_for', label: 'Cocok untuk', multiline: true }, { key: 'problems', label: 'Masalah yang ditangani', multiline: true }, { key: 'scope', label: 'Scope pekerjaan', multiline: true }, { key: 'deliverables', label: 'Deliverables', multiline: true }, { key: 'process', label: 'Proses kerja', multiline: true }, { key: 'faq', label: 'FAQ (pertanyaan | jawaban)', multiline: true }],
  PROYEK: [{ key: 'client', label: 'Klien (opsional)' }, { key: 'location', label: 'Lokasi' }, { key: 'sector', label: 'Sektor' }, { key: 'start_year', label: 'Tahun mulai' }, { key: 'end_year', label: 'Tahun selesai' }, { key: 'challenge', label: 'Tantangan', multiline: true }, { key: 'solution', label: 'Solusi', multiline: true }, { key: 'scope', label: 'Scope pekerjaan', multiline: true }, { key: 'result', label: 'Hasil', multiline: true }],
  ARTIKEL: [{ key: 'author', label: 'Penulis' }],
  GALERI: [{ key: 'media_id', label: 'ID media' }, { key: 'alt', label: 'Alt text' }, { key: 'caption', label: 'Caption', multiline: true }],
  TESTIMONI: [{ key: 'position', label: 'Posisi' }, { key: 'company', label: 'Perusahaan' }, { key: 'quote', label: 'Kutipan', multiline: true }],
  KLIEN: [{ key: 'partner_type', label: 'Tipe (CLIENT / PARTNER)' }, { key: 'website', label: 'Website' }, { key: 'logo_alt', label: 'Alt logo' }],
  SERTIFIKASI: [{ key: 'issuer', label: 'Penerbit' }, { key: 'certificate_number', label: 'Nomor sertifikat' }, { key: 'issue_year', label: 'Tahun terbit' }, { key: 'expiration_date', label: 'Tanggal kedaluwarsa' }]
};

export function kindFor(module: string) { return editableModules[module] ?? null; }
export function labelFor(kind: string) { return (contentLabels as Record<string, string>)[kind] ?? kind; }
export function assertModuleAccess(user: AdminUser, module: string) {
  const editor = new Set(['konten', 'layanan', 'proyek', 'galeri', 'artikel', 'testimoni', 'klien', 'sertifikasi', 'media', 'pesan-masuk']);
  if (user.role === 'SUPER_ADMIN' || editor.has(module)) return;
  error(403, 'Anda tidak memiliki akses ke modul ini.');
}

export async function listContent(env: Env, kind: string, query = '') {
  const search = cleanText(query, 100);
  const where = search ? "WHERE kind = ? AND (title LIKE ? OR slug LIKE ? OR summary LIKE ?)" : 'WHERE kind = ?';
  const values = search ? [kind, `%${search}%`, `%${search}%`, `%${search}%`] : [kind];
  const rows = await env.DB.prepare(`SELECT id, title, slug, category, status, featured, updated_at FROM content_items ${where} ORDER BY updated_at DESC LIMIT 50`).bind(...values).all<{ id: string; title: string; slug: string; category: string; status: string; featured: number; updated_at: string }>();
  return rows.results;
}

export async function saveContent(env: Env, user: AdminUser, kind: string, form: FormData, existingId?: string) {
  const title = cleanText(form.get('title'), 180);
  const slug = cleanText(form.get('slug'), 120);
  if (!title || !isSafeSlug(slug)) return { error: 'Judul wajib diisi dan slug harus memakai huruf kecil, angka, serta tanda hubung.' };
  const data = Object.fromEntries((fieldSets[kind] ?? []).map((field) => [field.key, cleanText(form.get(`meta_${field.key}`), 3000)]));
  const fields = [title, slug, cleanText(form.get('category'), 80), cleanText(form.get('summary'), 500), cleanText(form.get('body'), 12000), JSON.stringify(data), cleanText(form.get('seo_title'), 180), cleanText(form.get('meta_description'), 160), cleanText(form.get('canonical_url'), 500), cleanText(form.get('index_status'), 30) || 'INDEX_FOLLOW', cleanText(form.get('status'), 20) || 'DRAFT', form.get('featured') ? 1 : 0];
  try {
    if (existingId) {
      const previous = await env.DB.prepare('SELECT slug FROM content_items WHERE id = ? AND kind = ?').bind(existingId, kind).first<{ slug: string }>();
      await env.DB.prepare("UPDATE content_items SET title=?, slug=?, category=?, summary=?, body=?, data=?, seo_title=?, meta_description=?, canonical_url=?, index_status=?, status=?, featured=?, published_at=CASE WHEN ? = 'PUBLISHED' AND published_at IS NULL THEN CURRENT_TIMESTAMP ELSE published_at END, updated_at=CURRENT_TIMESTAMP WHERE id=? AND kind=?").bind(...fields, fields[10], existingId, kind).run();
      if (previous?.slug && previous.slug !== slug) await env.DB.prepare('INSERT INTO redirects (id, from_path, to_path, status_code) VALUES (?, ?, ?, 301) ON CONFLICT(from_path) DO UPDATE SET to_path=excluded.to_path').bind(crypto.randomUUID(), `/${routeForKind(kind)}/${previous.slug}`, `/${routeForKind(kind)}/${slug}`).run();
      await audit(env, user.id, 'UPDATE', kind, existingId, `Memperbarui ${title}`);
    } else {
      const id = crypto.randomUUID();
      await env.DB.prepare("INSERT INTO content_items (id, kind, title, slug, category, summary, body, data, seo_title, meta_description, canonical_url, index_status, status, featured, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CASE WHEN ? = 'PUBLISHED' THEN CURRENT_TIMESTAMP END)").bind(id, kind, ...fields, fields[10]).run();
      await audit(env, user.id, 'CREATE', kind, id, `Membuat ${title}`);
    }
  } catch { return { error: 'Slug sudah digunakan. Gunakan slug yang unik.' }; }
  return { ok: true };
}

export async function archiveContent(env: Env, user: AdminUser, kind: string, id: string) {
  await env.DB.prepare("UPDATE content_items SET status = 'ARCHIVED', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND kind = ?").bind(id, kind).run();
  await audit(env, user.id, 'ARCHIVE', kind, id, 'Mengarsipkan konten');
}

export { parseData };
