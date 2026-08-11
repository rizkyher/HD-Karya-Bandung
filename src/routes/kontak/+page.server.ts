import { fail, type Actions } from '@sveltejs/kit';
import { createInquiry } from '$lib/server/inquiries';

export const actions: Actions = {
  default: async ({ request, platform, getClientAddress }) => {
    if (!platform?.env) return fail(503, { error: 'Form belum terhubung ke layanan. Silakan coba lagi sesaat lagi.' });
    const reference = await createInquiry(platform.env, await request.formData(), getClientAddress());
    if (reference === 'RATE_LIMITED') return fail(429, { error: 'Terlalu banyak pengiriman. Tunggu 15 menit sebelum mencoba lagi.' });
    if (!reference) return fail(422, { error: 'Nama, nomor WhatsApp, dan kebutuhan proyek wajib diisi.' });
    return { reference };
  }
};
