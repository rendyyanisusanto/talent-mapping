<template>
  <div class="w-full">
    <div class="relative flex items-center justify-between w-full max-w-2xl mx-auto mb-8">
      <!-- Step 1 - Biodata -->
      <div 
        class="flex flex-col items-center relative z-10 group cursor-pointer"
        @click="$emit('go-to-step', 1)"
      >
        <div 
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all',
            currentStep >= 1
              ? 'bg-primary text-white shadow-[0_0_0_4px_rgba(82,17,212,0.2)]'
              : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-400'
          ]"
        >
          <span class="material-symbols-outlined text-xl">person</span>
        </div>
        <span 
          :class="[
            'mt-2 text-sm font-semibold',
            currentStep >= 1 ? 'text-primary' : 'text-gray-400'
          ]"
        >
          Biodata
        </span>
      </div>

      <!-- Line 1 -->
      <div class="flex-auto border-t-2 border-gray-200 dark:border-gray-700 absolute top-5 left-0 right-0 mx-8 z-0">
        <div 
          :class="[
            'h-0.5 bg-primary transition-all duration-300',
            currentStep >= 2 ? 'w-full' : currentStep === 1 ? 'w-[30%]' : 'w-0'
          ]"
        ></div>
      </div>

      <!-- Step 2 - Jalur -->
      <div 
        class="flex flex-col items-center relative z-10 group cursor-pointer"
        @click="currentStep >= 2 && $emit('go-to-step', 2)"
      >
        <div 
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
            currentStep >= 2
              ? 'bg-primary text-white shadow-[0_0_0_4px_rgba(82,17,212,0.2)]'
              : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-400'
          ]"
        >
          <span v-if="currentStep >= 2" class="material-symbols-outlined text-xl">movie</span>
          <span v-else>2</span>
        </div>
        <span 
          :class="[
            'mt-2 text-sm font-medium',
            currentStep >= 2 ? 'text-primary' : 'text-gray-400'
          ]"
        >
          Jalur
        </span>
      </div>

      <!-- Line 2 -->
      <div class="flex-auto border-t-2 border-gray-200 dark:border-gray-700 absolute top-5 left-0 right-0 mx-8 z-0">
        <div 
          :class="[
            'h-0.5 bg-primary transition-all duration-300',
            currentStep >= 3 ? 'w-full' : 'w-0'
          ]"
        ></div>
      </div>

      <!-- Step 3 - Detail -->
      <div 
        class="flex flex-col items-center relative z-10 group cursor-pointer"
        @click="currentStep >= 3 && $emit('go-to-step', 3)"
      >
        <div 
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
            currentStep >= 3
              ? 'bg-primary text-white shadow-[0_0_0_4px_rgba(82,17,212,0.2)]'
              : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-400'
          ]"
        >
          <span v-if="currentStep >= 3" class="material-symbols-outlined text-xl">check_circle</span>
          <span v-else>3</span>
        </div>
        <span 
          :class="[
            'mt-2 text-sm font-medium',
            currentStep >= 3 ? 'text-primary' : 'text-gray-400'
          ]"
        >
          Detail
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentStep: {
    type: Number,
    required: true,
    default: 1
  }
})

defineEmits(['go-to-step'])
</script>
