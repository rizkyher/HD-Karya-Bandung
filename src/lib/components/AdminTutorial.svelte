<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';

  type Spot = { top: number; left: number; width: number; height: number };
  type Step = { path: string; selector: string; title: string; body: string };

  const steps: Step[] = [
    { path: '/admin', selector: 'main h1', title: 'Dashboard admin', body: 'Ini ringkasan website. Dari sini Anda bisa melihat inquiry terbaru dan memulai pekerjaan utama.' },
    { path: '/admin/pengaturan', selector: 'a[href="/admin/pengaturan"]', title: 'Menu Pengaturan', body: 'Menu ini mengatur informasi bisnis yang tampil di seluruh website: nama, kontak, alamat, dan metadata.' },
    { path: '/admin/pengaturan', selector: 'input[name="company_name"]', title: 'Nama bisnis', body: 'Isi dengan nama usaha yang ingin tampil di header, judul website, dan identitas publik.' },
    { path: '/admin/pengaturan', selector: 'input[name="whatsapp_number"]', title: 'Nomor WhatsApp', body: 'Isi dengan nomor WhatsApp aktif dalam format angka agar tombol konsultasi mengarah ke nomor yang benar.' },
    { path: '/admin/konten', selector: 'a[href="/admin/konten"]', title: 'Menu Konten website', body: 'Di sini Anda mengubah teks halaman utama. Pilih section seperti hero atau layanan, lalu simpan setelah diperbarui.' },
    { path: '/admin/media', selector: 'input[type="file"]', title: 'Upload gambar', body: 'Upload foto layanan atau proyek di sini. Isi alt text yang menjelaskan isi gambar agar mudah dipahami dan lebih ramah aksesibilitas.' },
    { path: '/admin/layanan/baru', selector: 'input[name="title"]', title: 'Judul layanan', body: 'Isi dengan nama layanan yang mudah dipahami calon pelanggan, misalnya “Perbaikan Atap Bocor”.' },
    { path: '/admin/layanan/baru', selector: 'fieldset', title: 'Pilih gambar layanan', body: 'Pilih thumbnail gambar yang sudah diunggah. Setelah layanan disimpan dan diterbitkan, gambar ini akan muncul pada kartu layanan dan halaman detail.' },
    { path: '/admin/layanan/baru', selector: 'textarea[name="summary"]', title: 'Deskripsi singkat', body: 'Jelaskan masalah yang ditangani, hasil yang diharapkan, dan siapa yang cocok menggunakan layanan ini.' },
    { path: '/admin/pesan-masuk', selector: 'a[href="/admin/pesan-masuk"]', title: 'Pesan masuk', body: 'Buka inquiry baru untuk membaca kebutuhan pelanggan, lalu catat progres dan perbarui status setelah ditindaklanjuti.' }
  ];

  let spot = $state<Spot | null>(null);
  let dialog = $state<HTMLElement>();
  let index = $derived(Number(page.url.searchParams.get('tutorial')) - 1);
  let step = $derived(index >= 0 && index < steps.length ? steps[index] : null);

  function targetFor(selector: string) {
    return Array.from(document.querySelectorAll<HTMLElement>(selector)).find((element) => element.getClientRects().length > 0) ?? null;
  }

  function measure(scroll = false) {
    if (!step) return;
    const target = targetFor(step.selector);
    if (!target) { spot = null; return; }
    if (scroll) target.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    const rect = target.getBoundingClientRect();
    spot = { top: rect.top - 6, left: rect.left - 6, width: rect.width + 12, height: rect.height + 12 };
  }

  function move(nextIndex: number) {
    if (nextIndex < 0 || nextIndex >= steps.length) { void goto('/admin', { keepFocus: true }); return; }
    void goto(`${steps[nextIndex].path}?tutorial=${nextIndex + 1}`, { keepFocus: true });
  }

  $effect(() => {
    if (!browser || !step) { spot = null; return; }
    const frame = window.requestAnimationFrame(() => measure(true));
    const timers = [120, 360].map((delay) => window.setTimeout(() => measure(), delay));
    const resize = () => measure();
    window.addEventListener('resize', resize);
    const focusTimer = window.setTimeout(() => dialog?.focus(), 0);
    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(focusTimer);
      window.removeEventListener('resize', resize);
    };
  });
</script>

{#if step}
  <div class="fixed inset-0 z-50" aria-live="polite">
    {#if spot}<div class="pointer-events-none fixed border-2 border-clay" aria-hidden="true" style={`top:${spot.top}px;left:${spot.left}px;width:${spot.width}px;height:${spot.height}px;box-shadow: 0 0 0 100vmax rgba(18, 30, 25, 0.7);`}></div>{/if}
    <div class="fixed inset-x-5 bottom-5 z-10 mx-auto max-w-xl border border-stone bg-white p-5 shadow-2xl sm:left-auto sm:right-8 sm:mx-0" role="dialog" aria-label="Tur panduan admin" tabindex="-1" bind:this={dialog}>
      <div class="flex items-center justify-between gap-4"><p class="eyebrow text-clay">Tur admin · {index + 1}/{steps.length}</p><button class="text-sm font-bold underline decoration-stone underline-offset-4 hover:text-clay" type="button" onclick={() => move(-1)}>Tutup</button></div>
      <h2 class="mt-3 text-2xl font-bold tracking-[-0.03em]">{step.title}</h2>
      <p class="mt-3 leading-7 text-forest">{step.body}</p>
      <div class="mt-6 flex items-center justify-between gap-3"><button class="button-secondary min-h-10 px-4 py-2 disabled:cursor-not-allowed disabled:border-stone disabled:text-forest" type="button" disabled={index === 0} onclick={() => move(index - 1)}>Sebelumnya</button><button class="button-primary min-h-10 px-4 py-2" type="button" onclick={() => move(index + 1)}>{index === steps.length - 1 ? 'Selesai' : 'Berikutnya →'}</button></div>
    </div>
  </div>
{/if}
