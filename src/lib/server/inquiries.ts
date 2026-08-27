import { cleanText } from '$lib/content.js';
import { audit, sha256 } from './auth';

export async function createInquiry(env: Env, form: FormData, fingerprint: string) {
  const name = cleanText(form.get('name'), 100);
  const phone = cleanText(form.get('phone'), 50);
  const message = cleanText(form.get('message'), 3000);
  if (!name || !phone || !message) return null;
  const fingerprintHash = await sha256(fingerprint);
  await env.DB.prepare("DELETE FROM inquiry_attempts WHERE attempted_at < datetime('now', '-1 day')").run();
  const attempts = await env.DB.prepare("SELECT COUNT(*) AS total FROM inquiry_attempts WHERE fingerprint = ? AND attempted_at > datetime('now', '-15 minutes')")
    .bind(fingerprintHash)
    .first<{ total: number }>();
  if (Number(attempts?.total ?? 0) >= 5) return 'RATE_LIMITED' as const;
  await env.DB.prepare('INSERT INTO inquiry_attempts (id, fingerprint) VALUES (?, ?)').bind(crypto.randomUUID(), fingerprintHash).run();
  const id = crypto.randomUUID();
  const reference = `HD-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${id.slice(0, 6).toUpperCase()}`;
  await env.DB.prepare('INSERT INTO inquiries (id, reference, name, company, email, phone, service, project_location, timeline, budget, message, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(id, reference, name, cleanText(form.get('company'), 100), cleanText(form.get('email'), 254), phone, cleanText(form.get('service'), 100), cleanText(form.get('project_location'), 150), cleanText(form.get('timeline'), 100), cleanText(form.get('budget'), 100), message, 'website')
    .run();
  await audit(env, null, 'CREATE', 'INQUIRY', id, `Inquiry ${reference} diterima`);
  return reference;
}
