<template>
  <PublicLayout>
    <div class="w-full max-w-4xl space-y-8">
      <!-- Intro & Headline -->
      <div class="text-center space-y-2">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {{ headlineText }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400 text-lg">
          {{ stepSubtitle }}
        </p>
      </div>

      <!-- Stepper Component -->
      <StepperForm 
        :currentStep="currentStep" 
        @go-to-step="goToStep"
      />

      <!-- Main Form Card -->
      <div class="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden">
        <div class="p-6 md:p-10 space-y-8">
          <!-- Error Message -->
          <div v-if="error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div class="flex items-center gap-2 text-red-600 dark:text-red-400">
              <span class="material-symbols-outlined">error</span>
              <span class="font-medium">{{ error }}</span>
            </div>
          </div>

          <!-- Step 1: Biodata -->
          <BiodataForm
            v-if="currentStep === 1"
            :formData="formData"
            :errors="errors"
            :clusters="clusters"
            :isClusterLocked="isClusterLocked"
          />

          <!-- Step 2: Pilih Jalur -->
          <div v-if="currentStep === 2" class="space-y-6">
            <div class="text-center space-y-2 mb-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Pilih Jalur Anda</h3>
              <p class="text-gray-500 dark:text-gray-400">Apakah Anda tertarik menjadi crew atau talent artis?</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Crew Option -->
              <label class="cursor-pointer group">
                <input
                  v-model="formData.pilihan"
                  type="radio"
                  value="CREW"
                  class="peer sr-only"
                  name="pilihan"
                />
                <div class="p-8 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 peer-checked:border-primary peer-checked:bg-primary/5 transition-all hover:border-primary/50 hover:shadow-lg">
                  <div class="flex flex-col items-center text-center space-y-4">
                    <div class="w-20 h-20 rounded-full bg-primary/10 peer-checked:bg-primary flex items-center justify-center transition-all">
                      <span class="material-symbols-outlined text-4xl text-primary peer-checked:text-white">work</span>
                    </div>
                    <div>
                      <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Crew Film</h4>
                      <p class="text-gray-500 dark:text-gray-400 text-sm">
                        Bergabung sebagai crew di berbagai posisi produksi film
                      </p>
                    </div>
                  </div>
                </div>
              </label>

              <!-- Artist Option -->
              <label class="cursor-pointer group">
                <input
                  v-model="formData.pilihan"
                  type="radio"
                  value="ARTIS"
                  class="peer sr-only"
                  name="pilihan"
                />
                <div class="p-8 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 peer-checked:border-primary peer-checked:bg-primary/5 transition-all hover:border-primary/50 hover:shadow-lg">
                  <div class="flex flex-col items-center text-center space-y-4">
                    <div class="w-20 h-20 rounded-full bg-primary/10 peer-checked:bg-primary flex items-center justify-center transition-all">
                      <span class="material-symbols-outlined text-4xl text-primary peer-checked:text-white">person_celebrate</span>
                    </div>
                    <div>
                      <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Talent / Artis</h4>
                      <p class="text-gray-500 dark:text-gray-400 text-sm">
                        Daftar sebagai talent artis untuk bermain di film
                      </p>
                    </div>
                  </div>
                </div>
              </label>
            </div>

            <p v-if="errors.pilihan" class="text-sm text-red-500 text-center">
              {{ errors.pilihan }}
            </p>
          </div>

          <!-- Step 3A: Crew Form -->
          <CrewForm
            v-if="currentStep === 3 && formData.pilihan === 'CREW'"
            :formData="formData"
            :errors="errors"
          />

          <!-- Step 3B: Artist Form -->
          <ArtistForm
            v-if="currentStep === 3 && formData.pilihan === 'ARTIS'"
            :formData="formData"
            :errors="errors"
          />

          <!-- Agreement & Membership Section (Step 3 only) -->
          <div v-if="currentStep === 3" class="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <!-- Kinarya Coop Membership Info & Agreement -->
            <div class="p-6 bg-primary/5 border-2 border-primary/20 rounded-xl space-y-6">
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary text-3xl">info</span>
                <div class="flex-1">
                  <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    Persyaratan Keanggotaan
                  </h4>
                  <p class="text-gray-700 dark:text-gray-300 mb-3">
                    Pastikan Anda telah terdaftar sebagai <strong>MEMBER Kinarya Coop</strong> untuk melanjutkan.
                  </p>
                  <a
                    href="https://onemangrove.com/home/indo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors"
                  >
                    <span class="material-symbols-outlined text-sm">login</span>
                    Daftar Member Kinarya Coop
                    <span class="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                </div>
              </div>

              <!-- Agreement Checkbox -->
              <div class="pt-4 border-t border-primary/20">
                <label class="flex items-start gap-3 cursor-pointer group">
                  <input
                    v-model="agreedToTerms"
                    type="checkbox"
                    class="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0"
                  />
                  <span class="flex-1 text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    Saya menyetujui bahwa data yang saya berikan adalah benar dan saya telah terdaftar sebagai Member Kinarya Coop. Saya siap untuk dihubungi oleh tim Kinarya untuk proses selanjutnya.
                  </span>
                </label>
                <p v-if="errors.agreement" class="text-sm text-red-500 flex items-center gap-1 mt-2">
                  <span class="material-symbols-outlined text-sm">error</span>
                  {{ errors.agreement }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Action Bar -->
        <div class="bg-gray-50 dark:bg-gray-900/50 border-t border-border-light dark:border-border-dark p-6 md:px-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <span v-if="!isSubmitting" class="material-symbols-outlined text-[18px]">cloud_done</span>
            <span v-if="!isSubmitting">Langkah {{ currentStep }} dari 3</span>
          </div>

          <div class="flex gap-4 w-full sm:w-auto">
            <!-- Back Button -->
            <button
              v-if="currentStep > 1"
              @click="prevStep"
              :disabled="isSubmitting"
              class="flex-1 sm:flex-none px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-[18px]">arrow_back</span>
                Kembali
              </span>
            </button>

            <!-- Next/Submit Button -->
            <button
              v-if="currentStep < 3"
              @click="nextStep"
              :disabled="isSubmitting"
              class="flex-1 sm:flex-none px-8 py-3 rounded-lg bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30 hover:bg-primary-hover hover:shadow-primary/50 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Lanjut
              <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>

            <button
              v-else
              @click="submitForm"
              :disabled="isSubmitting || !agreedToTerms"
              class="flex-1 sm:flex-none px-8 py-3 rounded-lg bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30 hover:bg-primary-hover hover:shadow-primary/50 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting" class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              <span v-else>Submit</span>
              <span v-if="!isSubmitting" class="material-symbols-outlined text-[18px]">check_circle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </PublicLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PublicLayout from '@/components/layout/PublicLayout.vue'
import StepperForm from '@/components/form/StepperForm.vue'
import BiodataForm from '@/components/form/BiodataForm.vue'
import CrewForm from '@/components/form/CrewForm.vue'
import ArtistForm from '@/components/form/ArtistForm.vue'
import { useCluster } from '@/composables/useCluster'
import { useTalentForm } from '@/composables/useTalentForm'

const route = useRoute()

// Get cluster from URL param
const clusterCode = route.params.cluster || null

// Use composables
const {
  clusters,
  selectedCluster,
  isClusterLocked,
  loadClusters
} = useCluster(clusterCode)

const {
  currentStep,
  formData,
  errors,
  isSubmitting,
  error,
  nextStep: formNextStep,
  prevStep,
  goToStep,
  submitForm: originalSubmitForm,
  validateCurrentStep
} = useTalentForm()

// Agreement checkbox
const agreedToTerms = ref(false)

// Sync cluster selection with form data
const syncClusterToForm = () => {
  if (selectedCluster.value) {
    formData.cluster_id = selectedCluster.value
  }
}

// Next step with cluster sync
const nextStep = () => {
  syncClusterToForm()
  formNextStep()
}

// Submit with agreement validation
const submitForm = async () => {
  if (!agreedToTerms.value) {
    errors.agreement = 'Anda harus menyetujui persyaratan untuk melanjutkan'
    return
  }
  errors.agreement = ''
  await originalSubmitForm()
}

// Computed properties for dynamic content
const headlineText = computed(() => {
  const titles = {
    1: 'Mari kita kenali Anda',
    2: 'Pilih jalur yang Anda inginkan',
    3: formData.pilihan === 'CREW' ? 'Posisi crew yang diminati' : 'Detail informasi artis'
  }
  return titles[currentStep.value] || 'Registrasi Talent'
})

const stepSubtitle = computed(() => {
  const subtitles = {
    1: 'Langkah 1 dari 3: Informasi Personal',
    2: 'Langkah 2 dari 3: Pilih Jalur Karir',
    3: 'Langkah 3 dari 3: Lengkapi Detail'
  }
  return subtitles[currentStep.value] || ''
})

// Load data on mount
onMounted(async () => {
  await loadClusters()
  syncClusterToForm()
})
</script>
