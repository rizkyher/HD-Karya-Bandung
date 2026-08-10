const editorModules = new Set([
  'konten', 'layanan', 'proyek', 'galeri', 'artikel', 'testimoni',
  'klien', 'sertifikasi', 'media', 'pesan-masuk'
]);

export function canManage(role, module) {
  if (role === 'SUPER_ADMIN') return true;
  return role === 'EDITOR' && editorModules.has(module);
}

export function isAdminRoute(pathname) {
  return pathname.startsWith('/admin') && pathname !== '/admin/login';
}
