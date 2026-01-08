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
          class="peer sr-only"
        />
        <div class="p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 peer-checked:border-primary peer-checked:bg-primary/5 transition-all hover:border-primary/50 hover:shadow-md">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center peer-checked:bg-primary peer-checked:text-white transition-all">
                <span class="material-symbols-outlined">work</span>
              </div>
              <span class="font-semibold text-gray-900 dark:text-white">{{ position.name }}</span>
            </div>
            <div class="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-all">
              <span class="material-symbols-outlined text-white text-sm opacity-0 peer-checked:opacity-100">check</span>
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

onMounted(async () => {
  loading.value = true
  const { data } = await getCrewPositions()
  if (data) {
    crewPositions.value = data
  }
  loading.value = false
})
</script>
