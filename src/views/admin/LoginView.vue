<template>
  <div class="min-h-screen bg-gradient-to-br from-primary/10 via-background-light to-primary/5 dark:from-background-dark dark:via-background-dark dark:to-primary/10 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo & Title -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <div class="size-16 text-primary">
            <img src="/logo-kinarya.png" alt="Kinarya Logo" class="w-full h-full object-contain" />
          </div>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Kinarya Admin</h1>
        <p class="text-gray-500 dark:text-gray-400">Masuk untuk mengakses panel admin</p>
      </div>

      <!-- Login Card -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        <!-- Error Message -->
        <div v-if="authError" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div class="flex items-center gap-2 text-red-600 dark:text-red-400">
            <span class="material-symbols-outlined text-xl">error</span>
            <span class="text-sm font-medium">{{ authError }}</span>
          </div>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div class="relative">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="admin@kinarya.com"
              />
              <span class="material-symbols-outlined absolute left-3 top-3.5 text-gray-400">mail</span>
            </div>
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
              <span class="material-symbols-outlined absolute left-3 top-3.5 text-gray-400">lock</span>
            </div>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span v-if="loading" class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
            <span v-else>Masuk</span>
            <span v-if="!loading" class="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center">
        <router-link to="/" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
          ← Kembali ke halaman utama
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login, error: authError, loading } = useAuth()

const email = ref('')
const password = ref('')

async function handleLogin() {
  const success = await login(email.value, password.value)
  if (success) {
    router.push('/admin/dashboard')
  }
}
</script>
