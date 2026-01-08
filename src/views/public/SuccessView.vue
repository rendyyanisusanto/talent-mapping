<template>
  <PublicLayout>
    <div class="w-full max-w-2xl mx-auto text-center space-y-8">
      <!-- Success Icon -->
      <div class="flex justify-center">
        <div class="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
          <span class="material-symbols-outlined text-6xl text-green-600 dark:text-green-400">check_circle</span>
        </div>
      </div>

      <!-- Success Message -->
      <div class="space-y-4">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
          Pendaftaran Berhasil!
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Terima kasih telah mendaftarkan diri. Data Anda telah tersimpan dan akan segera diproses.
        </p>
      </div>

      <!-- Info Card -->
      <div class="bg-primary/5 border border-primary/20 rounded-xl p-6 text-left space-y-4">
        <h3 class="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">info</span>
          Langkah Selanjutnya
        </h3>
        <ul class="space-y-2 text-gray-600 dark:text-gray-400">
          <li class="flex items-start gap-2">
            <span class="material-symbols-outlined text-primary mt-0.5">check</span>
            <span>Tim kami akan meninjau aplikasi Anda</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="material-symbols-outlined text-primary mt-0.5">check</span>
            <span>Anda akan dihubungi melalui email atau WhatsApp</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="material-symbols-outlined text-primary mt-0.5">check</span>
            <span>Harap periksa email/WhatsApp Anda secara berkala</span>
          </li>
        </ul>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/"
          class="px-8 py-3 rounded-lg bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30 hover:bg-primary-hover hover:shadow-primary/50 transition-all flex items-center justify-center gap-2"
        >
          <span class="material-symbols-outlined">home</span>
          Kembali ke Beranda
        </router-link>
      </div>

      <!-- Contact INFO -->
      <div class="pt-8 border-t border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Ada pertanyaan? Hubungi kami di
          <a href="mailto:info@kinarya.com" class="text-primary hover:underline">info@kinarya.com</a>
        </p>
      </div>
    </div>
  </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/components/layout/PublicLayout.vue'
</script>
