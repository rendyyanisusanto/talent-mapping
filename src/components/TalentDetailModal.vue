<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="close">
        <div class="flex min-h-screen items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-black/50 transition-opacity" @click="close"></div>
          
          <!-- Modal -->
          <div class="relative w-full max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl transform transition-all max-h-[90vh] overflow-hidden flex flex-col">
            <!-- Header -->
            <div class="bg-gradient-to-r from-primary to-primary-hover p-6 text-white flex items-center justify-between">
              <div class="flex-1">
                <h2 class="text-2xl font-bold">{{ talent?.nama || 'Detail Talent' }}</h2>
                <p v-if="talent" class="text-sm text-primary-light mt-1">
                  {{ talent.jenis_kelamin }} • {{ calculateAge(talent.tanggal_lahir) }} tahun • {{ talent.pilihan }}
                </p>
              </div>
              <button 
                @click="close"
                class="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <span class="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-y-auto p-6">
              <!-- Loading State -->
              <div v-if="loading" class="flex flex-col items-center justify-center py-12">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p class="mt-4 text-gray-500">Memuat data talent...</p>
              </div>

              <!-- Error State -->
              <div v-else-if="error" class="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div class="flex items-center gap-3 text-red-600 dark:text-red-400">
                  <span class="material-symbols-outlined text-3xl">error</span>
                  <div>
                    <h3 class="font-bold">Terjadi Kesalahan</h3>
                    <p class="text-sm mt-1">{{ error }}</p>
                  </div>
                </div>
              </div>

              <!-- Talent Data -->
              <div v-else-if="talent" class="space-y-6">
                <!-- Biodata -->
                <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">person</span>
                    Biodata
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">email</span>
                        Email
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.email || '-' }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">phone</span>
                        No. HP
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.no_hp || '-' }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">location_on</span>
                        Tempat Lahir
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.tempat_lahir || '-' }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">cake</span>
                        Tanggal Lahir
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ formatDate(talent.tanggal_lahir) }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">badge</span>
                        NISN
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.nisn || '-' }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">school</span>
                        Asal Sekolah
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.asal_sekolah || '-' }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">map</span>
                        Provinsi
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.provinsi || '-' }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">location_city</span>
                        Kabupaten
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.kabupaten || '-' }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">category</span>
                        Cluster
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.cluster?.name || '-' }}</p>
                    </div>
                  </div>
                </div>

                <!-- Social Media -->
                <div v-if="talent.instagram || talent.facebook || talent.tiktok || talent.youtube" class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">share</span>
                    Media Sosial
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-if="talent.instagram" class="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <span class="material-symbols-outlined text-primary">photo_camera</span>
                      <div class="flex-1 min-w-0">
                        <p class="text-xs text-gray-500 dark:text-gray-400">Instagram</p>
                        <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ talent.instagram }}</p>
                      </div>
                    </div>
                    <div v-if="talent.facebook" class="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <span class="material-symbols-outlined text-primary">public</span>
                      <div class="flex-1 min-w-0">
                        <p class="text-xs text-gray-500 dark:text-gray-400">Facebook</p>
                        <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ talent.facebook }}</p>
                      </div>
                    </div>
                    <div v-if="talent.tiktok" class="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <span class="material-symbols-outlined text-primary">music_note</span>
                      <div class="flex-1 min-w-0">
                        <p class="text-xs text-gray-500 dark:text-gray-400">TikTok</p>
                        <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ talent.tiktok }}</p>
                      </div>
                    </div>
                    <div v-if="talent.youtube" class="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <span class="material-symbols-outlined text-primary">play_circle</span>
                      <div class="flex-1 min-w-0">
                        <p class="text-xs text-gray-500 dark:text-gray-400">YouTube</p>
                        <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ talent.youtube }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Crew Positions -->
                <div v-if="talent.pilihan === 'CREW' && talent.talent_crews?.length > 0" class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">work</span>
                    Posisi Crew yang Diminati
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="crew in talent.talent_crews" 
                      :key="crew.id"
                      class="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium inline-flex items-center gap-2"
                    >
                      <span class="material-symbols-outlined text-sm">check_circle</span>
                      {{ crew.crew_position.name }}
                    </span>
                  </div>
                </div>

                <!-- Crew Experience Details -->
                <div v-if="talent.pilihan === 'CREW' && talent.talent_crews?.length > 0" class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">history_edu</span>
                    Pengalaman & Minat Film
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">movie</span>
                        Pernah Terlibat Produksi Film
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">
                        {{ talent.talent_crews[0].pernah_terlibat ? 'Ya' : 'Belum pernah' }}
                      </p>
                    </div>
                    <div v-if="talent.talent_crews[0].pernah_terlibat && talent.talent_crews[0].judul_film">
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">theaters</span>
                        Judul Film
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.talent_crews[0].judul_film }}</p>
                    </div>
                    <div v-if="talent.talent_crews[0].pernah_terlibat && talent.talent_crews[0].peran_di_film">
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">badge</span>
                        Peran di Film
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.talent_crews[0].peran_di_film }}</p>
                    </div>
                    <div v-if="talent.talent_crews[0].genre_film">
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">category</span>
                        Genre Film Diminati
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.talent_crews[0].genre_film }}</p>
                    </div>
                    <div v-if="talent.talent_crews[0].minat_kontribusi" class="md:col-span-2">
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-2">
                        <span class="material-symbols-outlined text-sm">favorite</span>
                        Minat Kontribusi
                      </label>
                      <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                        {{ talent.talent_crews[0].minat_kontribusi }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Artist Details -->
                <div v-if="talent.pilihan === 'ARTIS' && talent.talent_artists?.length > 0" class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">person_celebrate</span>
                    Detail Artis
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">height</span>
                        Tinggi Badan
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.talent_artists[0].tinggi_badan }} cm</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">monitor_weight</span>
                        Berat Badan
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.talent_artists[0].berat_badan }} kg</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">visibility</span>
                        Berkacamata
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.talent_artists[0].berkacamata ? 'Ya' : 'Tidak' }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">palette</span>
                        Warna Kulit
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.talent_artists[0].warna_kulit || '-' }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">face_retouching_natural</span>
                        Jenis Rambut
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.talent_artists[0].jenis_rambut || '-' }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">movie</span>
                        Pernah Main Film
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.talent_artists[0].pernah_main_film ? 'Ya' : 'Tidak' }}</p>
                    </div>
                    <div v-if="talent.talent_artists[0].pernah_main_film" class="md:col-span-2">
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">theater_comedy</span>
                        Judul Film
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.talent_artists[0].judul_film || '-' }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-sm">favorite</span>
                        Genre Favorit
                      </label>
                      <p class="text-gray-900 dark:text-white font-medium">{{ talent.talent_artists[0].genre_favorit || '-' }}</p>
                    </div>
                  </div>
                </div>

                <!-- Meta Info -->
                <div class="text-xs text-gray-500 pt-4 border-t border-gray-200 dark:border-gray-700">
                  Terdaftar: {{ formatDateTime(talent.created_at) }}
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-3">
              <button
                @click="close"
                class="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getTalentById } from '@/services/talent.service'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  talentId: {
    type: [Number, String],
    default: null
  }
})

const emit = defineEmits(['close'])

const talent = ref(null)
const loading = ref(false)
const error = ref(null)

// Watch for modal open and talent ID changes
watch(() => [props.isOpen, props.talentId], ([isOpen, talentId]) => {
  if (isOpen && talentId) {
    loadTalent()
  } else if (!isOpen) {
    // Reset state when modal closes
    setTimeout(() => {
      talent.value = null
      error.value = null
    }, 300) // Wait for transition
  }
}, { immediate: true })

async function loadTalent() {
  if (!props.talentId) return
  
  loading.value = true
  error.value = null
  
  try {
    const { data, error: fetchError } = await getTalentById(props.talentId)
    
    if (fetchError) {
      error.value = 'Gagal memuat data talent'
      console.error('Error loading talent:', fetchError)
      return
    }
    
    if (!data) {
      error.value = 'Talent tidak ditemukan'
      return
    }
    
    talent.value = data
  } catch (err) {
    error.value = 'Terjadi kesalahan saat memuat data'
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
}

function close() {
  emit('close')
}

function formatDate(dateString) {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function formatDateTime(dateString) {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function calculateAge(birthDate) {
  if (!birthDate) return '-'
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>
