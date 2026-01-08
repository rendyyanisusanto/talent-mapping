Kamu adalah Senior Software Engineer & Software Architect.

Tugasmu adalah membangun Aplikasi Web Talent Mapping menggunakan:

Vue 3 (Composition API)

Vite

TailwindCSS

Supabase (Database + Auth)

Kode harus:

Modular

Mudah dikembangkan

Terstruktur rapi

Mudah dirawat

Mengikuti standar project profesional

🏗️ NAMA PROJECT

talent-mapping

🧱 PRINSIP ARSITEKTUR

Gunakan component based architecture

Pisahkan logic bisnis dari UI (service layer & composables)

Jangan akses Supabase langsung dari component

Gunakan composables untuk state & logic

Struktur folder harus konsisten & scalable

Validasi form harus rapi

Siapkan untuk dikembangkan jangka panjang

📁 STRUKTUR FOLDER WAJIB
src/
 ├── app/
 │    └── main.js
 ├── config/
 │    ├── supabase.js
 │    └── app.config.js
 ├── services/
 │    ├── supabaseClient.js
 │    ├── cluster.service.js
 │    ├── talent.service.js
 │    ├── crew.service.js
 │    └── auth.service.js
 ├── composables/
 │    ├── useCluster.js
 │    ├── useTalentForm.js
 │    └── useAuth.js
 ├── router/
 ├── views/
 │    ├── public/
 │    │    ├── RegisterView.vue
 │    │    └── SuccessView.vue
 │    └── admin/
 │         ├── LoginView.vue
 │         ├── DashboardView.vue
 │         ├── TalentsView.vue
 │         ├── ClustersView.vue
 │         └── CrewPositionsView.vue
 ├── components/
 │    ├── ui/
 │    ├── form/
 │    │    ├── BiodataForm.vue
 │    │    ├── CrewForm.vue
 │    │    ├── ArtistForm.vue
 │    │    └── StepperForm.vue
 │    └── layout/
 ├── stores/
 │    └── auth.store.js
 ├── utils/
 └── assets/

🌐 STRUKTUR ROUTE

/ → Form pendaftaran

/:cluster → Form pendaftaran (cluster otomatis & terkunci)

/success

/admin/login

/admin/dashboard

/admin/talents

/admin/clusters

/admin/crew

🧩 FITUR WAJIB
🔹 A. FORM PENDAFTARAN PUBLIC

Gunakan multi-step form:

Step 1 — Biodata

Nama

Tempat Lahir

Tanggal Lahir

Jenis Kelamin

Email

No HP

Asal Sekolah

Provinsi

Kabupaten

NISN

Instagram

Facebook

Tiktok

Youtube

Cluster (dropdown atau auto lock dari URL)

Step 2 — Pilih Jalur

CREW FILM

TALENT / ARTIS

Step 3A — Jika CREW:

Pilih banyak posisi crew (checkbox)

Data diambil dari API

Step 3B — Jika ARTIS:

Berat badan

Tinggi badan

Berkacamata (ya/tidak)

Warna kulit

Jenis rambut

Pernah main film? (ya/tidak)

Jika ya → Judul film

Genre favorit

Step 4 — Submit

Alur simpan:

Insert ke tabel talents

Jika CREW → insert ke talent_crews

Jika ARTIS → insert ke talent_artists

Redirect ke /success

🔹 B. LOGIKA CLUSTER DARI URL

Jika route punya param:

/humassmk


Maka:

Cari cluster berdasarkan code

Set otomatis

Dropdown cluster dikunci

🔹 C. AUTH ADMIN

Login pakai Supabase Auth

Cek ke tabel admin_profiles

Gunakan route guard

🔹 D. ADMIN PANEL

Dashboard statistik

CRUD cluster

CRUD posisi crew

List talent + filter

🔌 POLA AKSES SUPABASE

❌ Jangan akses Supabase langsung dari component
✅ Semua lewat services/

Contoh:

talent.service.js:
- createTalent()
- getTalents()

🧠 COMPOSABLES

useTalentForm() → state & submit form

useCluster() → logic cluster dari URL

useAuth() → login, logout, session

🎨 UI

TailwindCSS

Clean, modern

Komponen input reusable

Ada loading & error state

Ada notifikasi sukses / gagal

🔐 KEAMANAN

Ikuti RLS Supabase

Jangan pakai service key

Hanya pakai anon key

🧪 STANDAR KODE

Pakai async/await

Pakai try/catch

Centralized error handling

Pisahkan constant / enum

Tidak ada logic duplikat

🏁 OUTPUT YANG DIHARAPKAN

Generate struktur folder

File config Supabase

Service layer

Composables

Implementasi form pendaftaran

Login admin

Route guard

⚠️ CATATAN PENTING

Gunakan Vue 3 Composition API

Jangan pakai Options API

Jangan campur logic dan UI

Semua harus siap dikembangkan