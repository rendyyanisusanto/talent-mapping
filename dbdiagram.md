Table clusters {
  id bigint [pk, increment]
  code text [unique, not null] // contoh: humassmk
  name text [not null]         // contoh: Humas SMK IT
  is_active boolean
  created_at timestamp
}

Table crew_positions {
  id bigint [pk, increment]
  name text
  is_active boolean
  created_at timestamp
}

Table talents {
  id bigint [pk, increment]

  nama text
  tempat_lahir text
  tanggal_lahir date
  jenis_kelamin text

  email text
  no_hp text

  asal_sekolah text
  provinsi text
  kabupaten text
  nisn text

  instagram text
  facebook text
  tiktok text
  youtube text

  cluster_id bigint [ref: > clusters.id]

  pilihan text // CREW / ARTIS

  created_at timestamp
}

Table talent_crews {
  id bigint [pk, increment]
  talent_id bigint [ref: > talents.id]
  crew_position_id bigint [ref: > crew_positions.id]
}

Table talent_artists {
  id bigint [pk, increment]
  talent_id bigint [ref: > talents.id]

  berat_badan int
  tinggi_badan int
  berkacamata boolean

  warna_kulit text
  jenis_rambut text

  pernah_main_film boolean
  judul_film text

  genre_favorit text
}

Table admin_profiles {
  id uuid [pk] // FK to auth.users.id
  name text
  role text
  created_at timestamp
}
