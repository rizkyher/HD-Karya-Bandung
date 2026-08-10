export const contentKinds = {
  layanan: 'LAYANAN', proyek: 'PROYEK', artikel: 'ARTIKEL', galeri: 'GALERI',
  testimoni: 'TESTIMONI', klien: 'KLIEN', sertifikasi: 'SERTIFIKASI'
};

export const contentLabels = {
  LAYANAN: 'Layanan', PROYEK: 'Proyek', ARTIKEL: 'Artikel', GALERI: 'Galeri',
  TESTIMONI: 'Testimoni', KLIEN: 'Klien & partner', SERTIFIKASI: 'Sertifikasi'
};

export function cleanText(value, max = 3000) { return String(value ?? '').trim().slice(0, max); }
export function isSafeSlug(value) { return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value); }
export function routeForKind(kind) { return Object.entries(contentKinds).find(([, value]) => value === kind)?.[0] ?? ''; }
export function parseData(value) { try { const data = JSON.parse(String(value ?? '{}')); return data && typeof data === 'object' && !Array.isArray(data) ? data : {}; } catch { return {}; } }
