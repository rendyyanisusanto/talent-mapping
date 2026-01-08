<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="isVisible"
        class="fixed top-4 right-4 z-[9999] max-w-sm"
      >
        <div
          :class="[
            'flex items-start gap-3 p-4 rounded-lg shadow-lg border',
            typeClasses
          ]"
        >
          <span class="material-symbols-outlined text-2xl flex-shrink-0">
            {{ icon }}
          </span>
          <div class="flex-1 min-w-0">
            <h4 v-if="title" class="font-semibold text-sm mb-1">{{ title }}</h4>
            <p class="text-sm">{{ message }}</p>
          </div>
          <button
            @click="close"
            class="flex-shrink-0 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors"
          >
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  },
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const isVisible = ref(false)
let timeoutId = null

const typeClasses = computed(() => {
  const types = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
  }
  return types[props.type] || types.success
})

const icon = computed(() => {
  const icons = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info'
  }
  return icons[props.type] || icons.success
})

watch(() => props.show, (newVal) => {
  if (newVal) {
    show()
  } else {
    close()
  }
}, { immediate: true })

function show() {
  isVisible.value = true
  
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  
  if (props.duration > 0) {
    timeoutId = setTimeout(() => {
      close()
    }, props.duration)
  }
}

function close() {
  isVisible.value = false
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  emit('close')
}
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.2s ease-in;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
