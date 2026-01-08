<template>
  <div class="space-y-6">
    <!-- Form Fields Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <!-- Nama Lengkap -->
      <div class="space-y-1.5 col-span-1 md:col-span-2">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="nama">
          Nama Lengkap <span class="text-red-500">*</span>
        </label>
        <input
          id="nama"
          v-model="formData.nama"
          type="text"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400"
          placeholder="Masukkan nama lengkap"
          :class="{ 'border-red-500': errors.nama }"
        />
        <p v-if="errors.nama" class="text-sm text-red-500">{{ errors.nama }}</p>
      </div>

      <!-- Tempat Lahir & Tanggal Lahir -->
      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="tempat_lahir">
          Tempat Lahir <span class="text-red-500">*</span>
        </label>
        <input
          id="tempat_lahir"
          v-model="formData.tempat_lahir"
          type="text"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="Contoh: Jakarta"
          :class="{ 'border-red-500': errors.tempat_lahir }"
        />
        <p v-if="errors.tempat_lahir" class="text-sm text-red-500">{{ errors.tempat_lahir }}</p>
      </div>

      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="tanggal_lahir">
          Tanggal Lahir <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <input
            id="tanggal_lahir"
            v-model="formData.tanggal_lahir"
            type="date"
            class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 pr-10 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all [color-scheme:light] dark:[color-scheme:dark]"
            :class="{ 'border-red-500': errors.tanggal_lahir }"
          />
          <span class="material-symbols-outlined absolute right-3 top-3 text-gray-400 pointer-events-none">calendar_month</span>
        </div>
        <p v-if="errors.tanggal_lahir" class="text-sm text-red-500">{{ errors.tanggal_lahir }}</p>
      </div>

      <!-- Jenis Kelamin -->
      <div class="space-y-1.5 col-span-1 md:col-span-2">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Jenis Kelamin <span class="text-red-500">*</span>
        </label>
        <div class="flex flex-wrap gap-3">
          <label class="cursor-pointer">
            <input
              v-model="formData.jenis_kelamin"
              type="radio"
              value="Laki-laki"
              class="peer sr-only"
              name="jenis_kelamin"
            />
            <div class="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
              Laki-laki
            </div>
          </label>
          <label class="cursor-pointer">
            <input
              v-model="formData.jenis_kelamin"
              type="radio"
              value="Perempuan"
              class="peer sr-only"
              name="jenis_kelamin"
            />
            <div class="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
              Perempuan
            </div>
          </label>
        </div>
        <p v-if="errors.jenis_kelamin" class="text-sm text-red-500">{{ errors.jenis_kelamin }}</p>
      </div>

      <!-- Contact Info -->
      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="email">
          Email <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="email@example.com"
            :class="{ 'border-red-500': errors.email }"
          />
          <span class="material-symbols-outlined absolute left-3 top-3 text-gray-400">mail</span>
        </div>
        <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</p>
      </div>

      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="no_hp">
          No HP <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <input
            id="no_hp"
            v-model="formData.no_hp"
            type="tel"
            class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="08123456789"
            :class="{ 'border-red-500': errors.no_hp }"
          />
          <span class="material-symbols-outlined absolute left-3 top-3 text-gray-400">call</span>
        </div>
        <p v-if="errors.no_hp" class="text-sm text-red-500">{{ errors.no_hp }}</p>
      </div>

      <!-- Asal Sekolah -->
      <div class="space-y-1.5 col-span-1 md:col-span-2">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="asal_sekolah">
          Asal Sekolah
        </label>
        <input
          id="asal_sekolah"
          v-model="formData.asal_sekolah"
          type="text"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="Nama sekolah"
        />
      </div>

      <!-- Provinsi & Kabupaten -->
      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="provinsi">
          Provinsi
        </label>
        <input
          id="provinsi"
          v-model="formData.provinsi"
          type="text"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="Nama provinsi"
        />
      </div>

      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="kabupaten">
          Kabupaten/Kota
        </label>
        <input
          id="kabupaten"
          v-model="formData.kabupaten"
          type="text"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="Nama kabupaten/kota"
        />
      </div>

      <!-- NISN -->
      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="nisn">
          NISN
        </label>
        <input
          id="nisn"
          v-model="formData.nisn"
          type="text"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="10 digit NISN"
          maxlength="10"
        />
      </div>

      <!-- Social Media Header -->
      <div class="col-span-1 md:col-span-2 pt-4 pb-2 border-b border-border-light dark:border-border-dark mb-2">
        <h4 class="text-md font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">share</span>
          Media Sosial
        </h4>
      </div>

      <!-- Instagram -->
      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="instagram">
          Instagram
        </label>
        <input
          id="instagram"
          v-model="formData.instagram"
          type="text"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="@username"
        />
      </div>

      <!-- Facebook -->
      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="facebook">
          Facebook
        </label>
        <input
          id="facebook"
          v-model="formData.facebook"
          type="text"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="Nama Facebook"
        />
      </div>

      <!-- TikTok -->
      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="tiktok">
          TikTok
        </label>
        <input
          id="tiktok"
          v-model="formData.tiktok"
          type="text"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="@username"
        />
      </div>

      <!-- YouTube -->
      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="youtube">
          YouTube
        </label>
        <input
          id="youtube"
          v-model="formData.youtube"
          type="text"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="Channel name"
        />
      </div>

      <!-- Cluster -->
      <div class="space-y-1.5 col-span-1 md:col-span-2">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="cluster">
          Cluster <span class="text-red-500">*</span>
        </label>
        <select
          id="cluster"
          v-model="formData.cluster_id"
          :disabled="isClusterLocked"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
          :class="{ 
            'border-red-500': errors.cluster_id,
            'bg-gray-50 dark:bg-gray-900 cursor-not-allowed': isClusterLocked
          }"
        >
          <option value="">Pilih Cluster</option>
          <option v-for="cluster in clusters" :key="cluster.id" :value="cluster.id">
            {{ cluster.name }}
          </option>
        </select>
        <p v-if="errors.cluster_id" class="text-sm text-red-500">{{ errors.cluster_id }}</p>
        <p v-if="isClusterLocked" class="text-sm text-gray-500">
          <span class="material-symbols-outlined text-sm align-middle">lock</span>
          Cluster terkunci dari URL
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  formData: {
    type: Object,
    required: true
  },
  errors: {
    type: Object,
    default: () => ({})
  },
  clusters: {
    type: Array,
    default: () => []
  },
  isClusterLocked: {
    type: Boolean,
    default: false
  }
})
</script>
