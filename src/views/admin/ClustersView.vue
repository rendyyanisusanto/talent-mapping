<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header with Add Button -->
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold">Cluster Management</h2>
          <p class="text-gray-500 mt-1">Kelola daftar cluster untuk talent mapping</p>
        </div>
        <button
          @click="openCreateModal"
          class="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors flex items-center gap-2"
        >
          <span class="material-symbols-outlined">add</span>
          Tambah Cluster
        </button>
      </div>

      <!-- Clusters List -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div v-if="loading" class="p-12 text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>

        <div v-else-if="clusters.length === 0" class="p-12 text-center">
          <span class="material-symbols-outlined text-6xl text-gray-300">category_off</span>
          <p class="mt-4 text-gray-500">Belum ada cluster</p>
        </div>

        <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
          <div v-for="cluster in clusters" :key="cluster.id" class="p-6 hover:bg-gray-50 dark:hover:bg-gray-900/50">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span class="material-symbols-outlined text-primary">category</span>
                  </div>
                  <div>
                    <h3 class="font-bold text-lg text-gray-900 dark:text-white">{{ cluster.name }}</h3>
                    <p class="text-sm text-gray-500">
                      Code: <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{{ cluster.code }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span :class="[
                  'px-3 py-1 text-xs font-semibold rounded-full',
                  cluster.is_active 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                ]">
                  {{ cluster.is_active ? 'Active' : 'Inactive' }}
                </span>
                <button
                  @click="editCluster(cluster)"
                  class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button
                  @click="deleteClusterItem(cluster.id)"
                  class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete"
                >
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Create/Edit Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
          <h3 class="text-xl font-bold mb-4">{{ editMode ? 'Edit Cluster' : 'Tambah Cluster Baru' }}</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Nama Cluster</label>
              <input
                v-model="newCluster.name"
                type="text"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 py-2 px-4"
                placeholder="Contoh: Humas SMK IT"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Code</label>
              <input
                v-model="newCluster.code"
                type="text"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 py-2 px-4"
                placeholder="Contoh: humassmk"
              />
            </div>
            <div class="flex gap-3">
              <button
                @click="saveCluster"
                :disabled="!newCluster.name || !newCluster.code || saving"
                class="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span v-if="saving" class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                <span>{{ saving ? 'Menyimpan...' : 'Simpan' }}</span>
              </button>
              <button
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <Toast
      :show="toast.show"
      :message="toast.message"
      :title="toast.title"
      :type="toast.type"
      @close="toast.show = false"
    />
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Toast from '@/components/Toast.vue'
import { getClusters, createCluster, updateCluster, deleteCluster } from '@/services/cluster.service'

const clusters = ref([])
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const editMode = ref(false)
const editingId = ref(null)
const newCluster = ref({ name: '', code: '', is_active: true })
const toast = ref({
  show: false,
  message: '',
  title: '',
  type: 'success'
})

async function loadClusters() {
  loading.value = true
  try {
    const { data } = await getClusters()
    if (data) {
      clusters.value = data
    }
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  editMode.value = false
  editingId.value = null
  newCluster.value = { name: '', code: '', is_active: true }
  showModal.value = true
}

function editCluster(cluster) {
  editMode.value = true
  editingId.value = cluster.id
  newCluster.value = { ...cluster }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function saveCluster() {
  saving.value = true
  try {
    if (editMode.value) {
      // Update existing cluster
      await updateCluster(editingId.value, newCluster.value)
      toast.value = {
        show: true,
        title: 'Berhasil!',
        message: 'Cluster berhasil diperbarui',
        type: 'success'
      }
    } else {
      // Create new cluster
      await createCluster(newCluster.value)
      toast.value = {
        show: true,
        title: 'Berhasil!',
        message: 'Cluster baru berhasil ditambahkan',
        type: 'success'
      }
    }
    closeModal()
    await loadClusters()
  } catch (error) {
    console.error('Error saving cluster:', error)
    toast.value = {
      show: true,
      title: 'Gagal!',
      message: editMode.value ? 'Terjadi kesalahan saat memperbarui cluster' : 'Terjadi kesalahan saat menyimpan cluster',
      type: 'error'
    }
  } finally {
    saving.value = false
  }
}

async function deleteClusterItem(id) {
  if (confirm('Yakin ingin menghapus cluster ini?')) {
    await deleteCluster(id)
    loadClusters()
  }
}

onMounted(() => {
  loadClusters()
})
</script>
