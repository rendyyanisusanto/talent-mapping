<template>
  <div class="space-y-6">
    <div class="text-center space-y-2 mb-8">
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Pilih Posisi Crew</h3>
      <p class="text-gray-500 dark:text-gray-400">Pilih satu atau lebih posisi yang Anda minati</p>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="mt-4 text-gray-500">Memuat posisi crew...</p>
    </div>

    <div v-else-if="crewPositions.length === 0" class="text-center py-12">
      <span class="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">group_off</span>
      <p class="mt-4 text-gray-500">Belum ada posisi crew tersedia</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label 
        v-for="position in crewPositions" 
        :key="position.id"
        class="cursor-pointer group"
      >
        <input
          v-model="formData.crewPositions"
          type="checkbox"
          :value="position.id"
          class="sr-only"
        />
        <div class="p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 group-has-[:checked]:border-primary group-has-[:checked]:bg-primary/5 transition-all hover:border-primary/50 hover:shadow-md">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-has-[:checked]:bg-primary transition-all">
                <span class="material-symbols-outlined text-primary group-has-[:checked]:text-white transition-all">work</span>
              </div>
              <span class="font-semibold text-gray-900 dark:text-white">{{ position.name }}</span>
            </div>
            <div class="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 group-has-[:checked]:border-primary group-has-[:checked]:bg-primary flex items-center justify-center transition-all">
              <span class="material-symbols-outlined text-white text-sm opacity-0 group-has-[:checked]:opacity-100 transition-all">check</span>
            </div>
          </div>
        </div>
      </label>
    </div>

    <p v-if="errors.crewPositions" class="text-sm text-red-500 text-center">
      {{ errors.crewPositions }}
    </p>

    <div v-if="formData.crewPositions.length > 0" class="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
      <p class="text-sm text-gray-700 dark:text-gray-300">
        <span class="font-semibold">{{ formData.crewPositions.length }}</span> posisi dipilih
      </p>
    </div>

    <!-- Crew Experience Section - Always visible -->
    <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
      <div class="text-center space-y-2 mb-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">Pengalaman & Minat</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Ceritakan pengalaman dan minat kamu di dunia film</p>
      </div>

      <!-- 1. Pernah Terlibat -->
      <div class="space-y-3">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          <span class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-lg">movie</span>
            Pernah terlibat dalam pembuatan film sebelumnya?
            <span class="text-red-500">*</span>
          </span>
        </label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="cursor-pointer group">
            <input
              v-model="formData.pernah_terlibat"
              type="radio"
              :value="true"
              class="sr-only"
              name="pernah_terlibat"
            />
            <div class="p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 group-has-[:checked]:border-primary group-has-[:checked]:bg-primary/5 transition-all hover:border-primary/50">
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-900 dark:text-white">Ya</span>
                <div class="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 group-has-[:checked]:border-primary group-has-[:checked]:bg-primary flex items-center justify-center transition-all">
                  <span class="material-symbols-outlined text-white text-sm opacity-0 group-has-[:checked]:opacity-100 transition-all">check</span>
                </div>
              </div>
            </div>
          </label>
          <label class="cursor-pointer group">
            <input
              v-model="formData.pernah_terlibat"
              type="radio"
              :value="false"
              class="sr-only"
              name="pernah_terlibat"
            />
            <div class="p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 group-has-[:checked]:border-primary group-has-[:checked]:bg-primary/5 transition-all hover:border-primary/50">
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-900 dark:text-white">Belum pernah</span>
                <div class="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 group-has-[:checked]:border-primary group-has-[:checked]:bg-primary flex items-center justify-center transition-all">
                  <span class="material-symbols-outlined text-white text-sm opacity-0 group-has-[:checked]:opacity-100 transition-all">check</span>
                </div>
              </div>
            </div>
          </label>
        </div>
        <p v-if="errors.pernah_terlibat" class="text-sm text-red-500">
          {{ errors.pernah_terlibat }}
        </p>
      </div>

      <!-- 2 & 3. Conditional: Judul Film & Peran -->
      <div v-if="formData.pernah_terlibat === true" class="space-y-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            <span class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-lg">theaters</span>
              Judul film yang pernah kamu buat
              <span class="text-red-500">*</span>
            </span>
          </label>
          <input
            v-model="formData.judul_film"
            type="text"
            placeholder="Contoh: Film pendek / web series / film layar lebar"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <p v-if="errors.judul_film" class="text-sm text-red-500">
            {{ errors.judul_film }}
          </p>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            <span class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-lg">badge</span>
              Peran kamu di film tersebut sebagai apa?
              <span class="text-red-500">*</span>
            </span>
          </label>
          <input
            v-model="formData.peran_di_film"
            type="text"
            placeholder="Contoh: Sutradara, Kameramen, Editor, dll"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <p v-if="errors.peran_di_film" class="text-sm text-red-500">
            {{ errors.peran_di_film }}
          </p>
        </div>
      </div>

      <!-- 4. Genre Film -->
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          <span class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-lg">category</span>
            Genre film yang kamu minati
          </span>
        </label>
        <input
          v-model="formData.genre_film"
          type="text"
          placeholder="Contoh: Drama, Komedi, Dokumenter, Thriller, dll"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      <!-- 5. Minat Kontribusi - Single Select -->
      <div class="space-y-3">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          <span class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-lg">favorite</span>
            Kamu tertarik berkontribusi sebagai apa ke depan?
          </span>
          <span class="text-xs font-normal text-gray-500 dark:text-gray-400 block mt-1">(Opsional, bantu talent mapping)</span>
        </label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label v-for="option in kontribusiOptions" :key="option" class="cursor-pointer group">
            <input
              v-model="formData.minat_kontribusi"
              type="radio"
              :value="option"
              class="sr-only"
              name="minat_kontribusi"
            />
            <div class="p-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 group-has-[:checked]:border-primary group-has-[:checked]:bg-primary/5 transition-all hover:border-primary/50">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ option }}</span>
                <div class="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 group-has-[:checked]:border-primary group-has-[:checked]:bg-primary flex items-center justify-center transition-all">
                  <span class="material-symbols-outlined text-white text-sm opacity-0 group-has-[:checked]:opacity-100 transition-all">check</span>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCrewPositions } from '@/services/crew.service'

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

const crewPositions = ref([])
const loading = ref(false)

const kontribusiOptions = [
  'Di depan layar',
  'Di balik layar',
  'Ide cerita & konsep',
  'Produksi',
  'Manajemen',
  'Post Produksi',
  'Masih eksplor'
]

onMounted(async () => {
  loading.value = true
  const { data } = await getCrewPositions()
  if (data) {
    crewPositions.value = data
  }
  loading.value = false
})
</script>
