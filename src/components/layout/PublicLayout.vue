<template>
  <div class="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-gray-100 antialiased min-h-screen flex flex-col">
    <!-- Top Navigation -->
    <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark">
      <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="size-8 text-primary">
              <img src="/logo-kinarya.png" alt="Kinarya Logo" class="w-full h-full object-contain" />
            </div>
            <h2 class="text-[#120d1b] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Kinarya Coop - Talent Mapping</h2>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow flex flex-col items-center py-8 px-4 sm:px-6">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="mt-auto py-8">
      <div class="flex justify-center items-center gap-2 text-gray-400 dark:text-gray-500">
        <span class="material-symbols-outlined text-[16px]">lock</span>
        <span class="text-xs font-medium">Data Anda aman dan terenkripsi dengan Kinarya.</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
// No props or logic needed for basic layout
</script>
