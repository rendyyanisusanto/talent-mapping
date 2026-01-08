<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Talents</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {{ stats.totalTalents }}
              </p>
            </div>
            <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <span class="material-symbols-outlined text-primary text-2xl">group</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Clusters</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {{ stats.totalClusters }}
              </p>
            </div>
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <span class="material-symbols-outlined text-green-600 dark:text-green-400 text-2xl">category</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Crew Positions</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {{ stats.totalCrewPositions }}
              </p>
            </div>
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">work</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Artists</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {{ stats.totalArtists }}
              </p>
            </div>
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <span class="material-symbols-outlined text-purple-600 dark:text-purple-400 text-2xl">person_celebrate</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Talents -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">schedule</span>
            Pendaftaran Terbaru
          </h2>
        </div>

        <div v-if="loading" class="p-12 text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p class="mt-4 text-gray-500">Memuat data...</p>
        </div>

        <div v-else-if="recentTalents.length === 0" class="p-12 text-center">
          <span class="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">group_off</span>
          <p class="mt-4 text-gray-500">Belum ada pendaftaran</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Nama
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cluster
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Jalur
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Waktu
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="talent in recentTalents" :key="talent.id" class="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <span class="material-symbols-outlined text-primary">person</span>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ talent.nama }}</div>
                      <div class="text-sm text-gray-500">{{ talent.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    {{ talent.cluster?.name || '-' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="[
                      'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                      talent.pilihan === 'CREW' 
                        ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
                        : 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400'
                    ]"
                  >
                    {{ talent.pilihan }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(talent.created_at) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
          <router-link
            to="/admin/talents"
            class="text-primary hover:text-primary-hover font-medium text-sm flex items-center gap-1 justify-center"
          >
            Lihat semua talents
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </router-link>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { getTalents, getTalentCount } from '@/services/talent.service'
import { getClusters } from '@/services/cluster.service'
import { getCrewPositions } from '@/services/crew.service'

const stats = ref({
  totalTalents: 0,
  totalClusters: 0,
  totalCrewPositions: 0,
  totalArtists: 0
})

const recentTalents = ref([])
const loading = ref(false)

function formatDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

async function loadDashboardData() {
  loading.value = true
  
  try {
    // Load stats
    const [talentsRes, clustersRes, crewRes, recentRes] = await Promise.all([
      getTalentCount(),
      getClusters(),
      getCrewPositions(),
      getTalents({ limit: 10 })
    ])

    stats.value.totalTalents = talentsRes.count || 0
    stats.value.totalClusters = clustersRes.data?.length || 0
    stats.value.totalCrewPositions = crewRes.data?.length || 0
    
    if (recentRes.data) {
      recentTalents.value = recentRes.data.slice(0, 10)
      stats.value.totalArtists = recentRes.data.filter(t => t.pilihan === 'ARTIS').length
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadDashboardData()
})
</script>
