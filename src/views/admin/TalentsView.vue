<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Cari nama atau email..."
              class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 py-2 px-4"
              @input="loadTalents"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cluster
            </label>
            <select
              v-model="filters.cluster_id"
              class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 py-2 px-4"
              @change="loadTalents"
            >
              <option value="">Semua Cluster</option>
              <option v-for="cluster in clusters" :key="cluster.id" :value="cluster.id">
                {{ cluster.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Jalur
            </label>
            <select
              v-model="filters.pilihan"
              class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 py-2 px-4"
              @change="loadTalents"
            >
              <option value="">Semua Jalur</option>
              <option value="CREW">Crew</option>
              <option value="ARTIS">Artis</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Talents Table -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Daftar Talents</h2>
            <span class="text-sm text-gray-500">Total: {{ talents.length }}</span>
          </div>
        </div>

        <div v-if="loading" class="p-12 text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>

        <div v-else-if="talents.length === 0" class="p-12 text-center">
          <span class="material-symbols-outlined text-6xl text-gray-300">group_off</span>
          <p class="mt-4 text-gray-500">Tidak ada talent ditemukan</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Nama</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Kontak</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Cluster</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Jalur</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="talent in talents" :key="talent.id" class="hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer transition-colors" @click="goToDetail(talent.id)">
                <td class="px-6 py-4">
                  <div class="font-medium text-gray-900 dark:text-white">{{ talent.nama }}</div>
                  <div class="text-sm text-gray-500">{{ talent.jenis_kelamin }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-white">{{ talent.email }}</div>
                  <div class="text-sm text-gray-500">{{ talent.no_hp }}</div>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700">
                    {{ talent.cluster?.name || '-' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span 
                    :class="[
                      'px-2 py-1 text-xs rounded-full',
                      talent.pilihan === 'CREW' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                    ]"
                  >
                    {{ talent.pilihan }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ new Date(talent.created_at).toLocaleDateString('id-ID') }}
                </td>
                <td class="px-6 py-4" @click.stop>
                  <button
                    @click="goToDetail(talent.id)"
                    class="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
                  >
                    <span class="material-symbols-outlined text-sm">visibility</span>
                    Lihat
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Talent Detail Modal -->
    <TalentDetailModal 
      :is-open="showDetailModal" 
      :talent-id="selectedTalentId"
      @close="closeDetailModal"
    />
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import TalentDetailModal from '@/components/TalentDetailModal.vue'
import { getTalents } from '@/services/talent.service'
import { getClusters } from '@/services/cluster.service'

const talents = ref([])
const clusters = ref([])
const loading = ref(false)
const filters = ref({
  search: '',
  cluster_id: '',
  pilihan: ''
})

// Modal state
const showDetailModal = ref(false)
const selectedTalentId = ref(null)

async function loadTalents() {
  loading.value = true
  try {
    const { data } = await getTalents(filters.value)
    if (data) {
      talents.value = data
    }
  } catch (error) {
    console.error('Error loading talents:', error)
  } finally {
    loading.value = false
  }
}

async function loadClusters() {
  const { data } = await getClusters()
  if (data) {
    clusters.value = data
  }
}

function goToDetail(talentId) {
  selectedTalentId.value = talentId
  showDetailModal.value = true
}

function closeDetailModal() {
  showDetailModal.value = false
  selectedTalentId.value = null
}

onMounted(() => {
  loadClusters()
  loadTalents()
})
</script>
