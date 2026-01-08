<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header with Add Button -->
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold">Crew Positions Management</h2>
          <p class="text-gray-500 mt-1">Kelola daftar posisi crew film</p>
        </div>
        <button
          @click="openCreateModal"
          class="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors flex items-center gap-2"
        >
          <span class="material-symbols-outlined">add</span>
          Tambah Posisi
        </button>
      </div>

      <!-- Crew Positions List -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div v-if="loading" class="p-12 text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>

        <div v-else-if="crewPositions.length === 0" class="p-12 text-center">
          <span class="material-symbols-outlined text-6xl text-gray-300">work_off</span>
          <p class="mt-4 text-gray-500">Belum ada posisi crew</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          <div v-for="position in crewPositions" :key="position.id" class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-colors group">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">work</span>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">{{ position.name }}</h3>
                  <span :class="[
                    'text-xs px-2 py-0.5 rounded-full',
                    position.is_active 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800'
                  ]">
                    {{ position.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  @click="editPosition(position)"
                  class="p-2 text-primary hover:bg-primary/10 rounded-lg"
                  title="Edit"
                >
                  <span class="material-symbols-outlined text-sm">edit</span>
                </button>
                <button
                  @click="deletePosition(position.id)"
                  class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  title="Delete"
                >
                  <span class="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Create/Edit Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
          <h3 class="text-xl font-bold mb-4">{{ editMode ? 'Edit Posisi Crew' : 'Tambah Posisi Crew' }}</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Nama Posisi</label>
              <input
                v-model="newPosition.name"
                type="text"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 py-2 px-4"
                placeholder="Contoh: Director, Camera Operator"
              />
            </div>
            <div class="flex gap-3">
              <button
                @click="savePosition"
                :disabled="!newPosition.name || saving"
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
import { getCrewPositions, createCrewPosition, updateCrewPosition, deleteCrewPosition } from '@/services/crew.service'

const crewPositions = ref([])
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const editMode = ref(false)
const editingId = ref(null)
const newPosition = ref({ name: '', is_active: true })
const toast = ref({
  show: false,
  message: '',
  title: '',
  type: 'success'
})

async function loadCrewPositions() {
  loading.value = true
  try {
    const { data } = await getCrewPositions()
    if (data) {
      crewPositions.value = data
    }
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  editMode.value = false
  editingId.value = null
  newPosition.value = { name: '', is_active: true }
  showModal.value = true
}

function editPosition(position) {
  editMode.value = true
  editingId.value = position.id
  newPosition.value = { ...position }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function savePosition() {
  saving.value = true
  try {
    if (editMode.value) {
      // Update existing position
      await updateCrewPosition(editingId.value, newPosition.value)
      toast.value = {
        show: true,
        title: 'Berhasil!',
        message: 'Posisi crew berhasil diperbarui',
        type: 'success'
      }
    } else {
      // Create new position
      await createCrewPosition(newPosition.value)
      toast.value = {
        show: true,
        title: 'Berhasil!',
        message: 'Posisi crew baru berhasil ditambahkan',
        type: 'success'
      }
    }
    closeModal()
    await loadCrewPositions()
  } catch (error) {
    console.error('Error saving position:', error)
    toast.value = {
      show: true,
      title: 'Gagal!',
      message: editMode.value ? 'Terjadi kesalahan saat memperbarui posisi' : 'Terjadi kesalahan saat menyimpan posisi',
      type: 'error'
    }
  } finally {
    saving.value = false
  }
}

async function deletePosition(id) {
  if (confirm('Yakin ingin menghapus posisi ini?')) {
    await deleteCrewPosition(id)
    loadCrewPositions()
  }
}

onMounted(() => {
  loadCrewPositions()
})
</script>
