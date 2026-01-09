<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" @click="close"></div>

        <!-- content -->
        <div class="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform transition-all overflow-hidden flex flex-col items-center animate-in">
          
          <!-- Close Button - Absolute Top Right -->
          <button 
            @click="close"
            class="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-sm"
            aria-label="Close popup"
          >
            <span class="material-symbols-outlined text-xl">close</span>
          </button>

          <!-- Image Container -->
          <div class="w-full relative">
            <img 
              src="/popup.jpeg" 
              alt="Welcome to Kinarya" 
              class="w-full h-auto object-contain max-h-[80vh]"
            />
          </div>

          <!-- Bottom Action (Optional text or button) -->
          <!-- <div class="p-4 w-full bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex justify-center">
            <button 
              @click="close"
              class="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors w-full sm:w-auto"
            >
              Lanjut
            </button>
          </div> -->
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isOpen = ref(false)
const STORAGE_KEY = 'kinarya_welcome_popup_shown'

onMounted(() => {
  // Check if already shown in this session
  const hasShown = sessionStorage.getItem(STORAGE_KEY)
  
  if (!hasShown) {
    // Show popup
    setTimeout(() => {
      isOpen.value = true
    }, 500) // Small delay for smooth entrance after page load
  }
})

function close() {
  isOpen.value = false
  // Mark as shown for this session
  sessionStorage.setItem(STORAGE_KEY, 'true')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom animation for the modal content scaling */
.animate-in {
  animation: modal-pop 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modal-pop {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
