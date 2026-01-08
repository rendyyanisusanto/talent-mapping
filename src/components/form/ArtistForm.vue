<template>
  <div class="space-y-6">
    <div class="text-center space-y-2 mb-8">
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Detail Artis</h3>
      <p class="text-gray-500 dark:text-gray-400">Lengkapi informasi fisik dan pengalaman Anda</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <!-- Fisik Header -->
      <div class="col-span-1 md:col-span-2 pb-2 border-b border-border-light dark:border-border-dark">
        <h4 class="text-md font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">accessibility_new</span>
          Atribut Fisik
        </h4>
      </div>

      <!-- Tinggi & Berat Badan -->
      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="tinggi_badan">
          Tinggi Badan (cm) <span class="text-red-500">*</span>
        </label>
        <input
          id="tinggi_badan"
          v-model.number="formData.tinggi_badan"
          type="number"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="170"
          :class="{ 'border-red-500': errors.tinggi_badan }"
        />
        <p v-if="errors.tinggi_badan" class="text-sm text-red-500">{{ errors.tinggi_badan }}</p>
      </div>

      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="berat_badan">
          Berat Badan (kg) <span class="text-red-500">*</span>
        </label>
        <input
          id="berat_badan"
          v-model.number="formData.berat_badan"
          type="number"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="60"
          :class="{ 'border-red-500': errors.berat_badan }"
        />
        <p v-if="errors.berat_badan" class="text-sm text-red-500">{{ errors.berat_badan }}</p>
      </div>

      <!-- Berkacamata -->
      <div class="space-y-1.5 col-span-1 md:col-span-2">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Berkacamata?
        </label>
        <div class="flex gap-3">
          <label class="cursor-pointer">
            <input
              v-model="formData.berkacamata"
              type="radio"
              :value="true"
              class="peer sr-only"
              name="berkacamata"
            />
            <div class="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
              Ya
            </div>
          </label>
          <label class="cursor-pointer">
            <input
              v-model="formData.berkacamata"
              type="radio"
              :value="false"
              class="peer sr-only"
              name="berkacamata"
            />
            <div class="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
              Tidak
            </div>
          </label>
        </div>
      </div>

      <!-- Warna Kulit -->
      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="warna_kulit">
          Warna Kulit
        </label>
        <select
          id="warna_kulit"
          v-model="formData.warna_kulit"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
        >
          <option value="">Pilih warna kulit</option>
          <option v-for="warna in warnaKulitOptions" :key="warna" :value="warna">
            {{ warna }}
          </option>
        </select>
      </div>

      <!-- Jenis Rambut -->
      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="jenis_rambut">
          Jenis Rambut
        </label>
        <select
          id="jenis_rambut"
          v-model="formData.jenis_rambut"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
        >
          <option value="">Pilih jenis rambut</option>
          <option v-for="jenis in jenisRambutOptions" :key="jenis" :value="jenis">
            {{ jenis }}
          </option>
        </select>
      </div>

      <!-- Pengalaman Header -->
      <div class="col-span-1 md:col-span-2 pt-4 pb-2 border-b border-border-light dark:border-border-dark">
        <h4 class="text-md font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">movie</span>
          Pengalaman
        </h4>
      </div>

      <!-- Pernah Main Film -->
      <div class="space-y-1.5 col-span-1 md:col-span-2">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Pernah main film sebelumnya?
        </label>
        <div class="flex gap-3">
          <label class="cursor-pointer">
            <input
              v-model="formData.pernah_main_film"
              type="radio"
              :value="true"
              class="peer sr-only"
              name="pernah_main_film"
            />
            <div class="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
              Ya
            </div>
          </label>
          <label class="cursor-pointer">
            <input
              v-model="formData.pernah_main_film"
              type="radio"
              :value="false"
              class="peer sr-only"
              name="pernah_main_film"
            />
            <div class="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
              Tidak
            </div>
          </label>
        </div>
      </div>

      <!-- Judul Film (conditional) -->
      <div v-if="formData.pernah_main_film" class="space-y-1.5 col-span-1 md:col-span-2">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="judul_film">
          Judul Film
        </label>
        <input
          id="judul_film"
          v-model="formData.judul_film"
          type="text"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="Masukkan judul film"
        />
      </div>

      <!-- Genre Favorit -->
      <div class="space-y-1.5 col-span-1 md:col-span-2">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="genre_favorit">
          Genre Film Favorit
        </label>
        <select
          id="genre_favorit"
          v-model="formData.genre_favorit"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
        >
          <option value="">Pilih genre favorit</option>
          <option v-for="genre in genreOptions" :key="genre" :value="genre">
            {{ genre }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppConfig from '@/config/app.config'

defineProps({
  formData: {
    type: Object,
    required: true
  },
  errors: {
    type: Object,
    default: () => ({})
  }
})

const warnaKulitOptions = AppConfig.WARNA_KULIT
const jenisRambutOptions = AppConfig.JENIS_RAMBUT
const genreOptions = AppConfig.GENRE_FILM
</script>
