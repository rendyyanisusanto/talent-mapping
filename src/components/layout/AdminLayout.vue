<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden lg:block">
      <div class="p-6">
        <div class="flex items-center gap-3 mb-8">
          <div class="size-8 text-primary">
            <img src="/logo-kinarya.png" alt="Kinarya Logo" class="w-full h-full object-contain" />
          </div>
          <h2 class="text-xl font-bold">Kinarya Admin</h2>
        </div>

        <nav class="space-y-2">
          <router-link
            to="/admin/dashboard"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            active-class="bg-primary text-white hover:bg-primary"
          >
            <span class="material-symbols-outlined">dashboard</span>
            <span class="font-medium">Dashboard</span>
          </router-link>

          <router-link
            to="/admin/talents"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            active-class="bg-primary text-white hover:bg-primary"
          >
            <span class="material-symbols-outlined">group</span>
            <span class="font-medium">Talents</span>
          </router-link>

          <router-link
            to="/admin/clusters"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            active-class="bg-primary text-white hover:bg-primary"
          >
            <span class="material-symbols-outlined">category</span>
            <span class="font-medium">Clusters</span>
          </router-link>

          <router-link
            to="/admin/crew"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            active-class="bg-primary text-white hover:bg-primary"
          >
            <span class="material-symbols-outlined">work</span>
            <span class="font-medium">Crew Positions</span>
          </router-link>
        </nav>

        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="handleLogout"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors w-full"
          >
            <span class="material-symbols-outlined">logout</span>
            <span class="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-screen">
      <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold">{{ pageTitle }}</h1>
          <div v-if="profile" class="flex items-center gap-3">
            <div class="text-right">
              <p class="font-semibold">{{ profile.name }}</p>
              <p class="text-sm text-gray-500">{{ profile.role }}</p>
            </div>
            <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              {{ profile.name?.charAt(0) }}
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { profile, logout } = useAuth()

const pageTitle = computed(() => {
  const titles = {
    'admin-dashboard': 'Dashboard',
    'admin-talents': 'Talents',
    'admin-clusters': 'Clusters',
    'admin-crew': 'Crew Positions'
  }
  return titles[route.name] || 'Admin'
})

async function handleLogout() {
  await logout()
  router.push('/admin/login')
}
</script>
