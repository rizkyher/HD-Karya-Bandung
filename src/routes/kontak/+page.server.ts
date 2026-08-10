import { fail, type Actions } from '@sveltejs/kit';
import { createInquiry } from '$lib/server/inquiries';

export const actions: Actions = {
  default: async ({ request, platform }) => {
    if (!platform?.env) return fail(503, { error: 'Form belum terhubung ke layanan. Silakan coba lagi sesaat lagi.' });
    const reference = await createInquiry(platform.env, await request.formData());
    if (!reference) return fail(422, { error: 'Nama, nomor WhatsApp, dan kebutuhan proyek wajib diisi.' });
    return { reference };
  }
};
