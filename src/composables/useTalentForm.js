import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { createTalent } from '@/services/talent.service'
import AppConfig from '@/config/app.config'
import { handleError } from '@/utils/errorHandler'

export function useTalentForm() {
    const router = useRouter()

    // Current step (1, 2, 3, 4)
    const currentStep = ref(1)

    // Loading states
    const isSubmitting = ref(false)
    const error = ref(null)

    // Form data
    const formData = reactive({
        // Step 1 - Biodata
        nama: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        email: '',
        no_hp: '',
        asal_sekolah: '',
        provinsi: '',
        kabupaten: '',
        nisn: '',
        instagram: '',
        facebook: '',
        tiktok: '',
        youtube: '',
        cluster_id: null,

        // Step 2 - Pilihan jalur
        pilihan: '', // 'CREW' atau 'ARTIS'

        // Step 3A - Crew (array of position IDs)
        crewPositions: [],
        pernah_terlibat: null,
        judul_film: '',
        peran_di_film: '',
        genre_film: '',
        minat_kontribusi: '', // Single selection

        // Step 3B - Artist
        berat_badan: null,
        tinggi_badan: null,
        berkacamata: false,
        warna_kulit: '',
        jenis_rambut: '',
        pernah_main_film: false,
        judul_film: '',
        genre_favorit: ''
    })

    // Validation errors
    const errors = reactive({})

    // Navigate to next step
    function nextStep() {
        if (validateCurrentStep()) {
            currentStep.value++
        }
    }

    // Navigate to previous step
    function prevStep() {
        if (currentStep.value > 1) {
            currentStep.value--
        }
    }

    // Go to specific step
    function goToStep(step) {
        currentStep.value = step
    }

    // Validate current step
    function validateCurrentStep() {
        errors.value = {}

        if (currentStep.value === 1) {
            return validateBiodata()
        } else if (currentStep.value === 2) {
            return validateJalur()
        } else if (currentStep.value === 3) {
            if (formData.pilihan === AppConfig.JALUR.CREW) {
                return validateCrew()
            } else if (formData.pilihan === AppConfig.JALUR.ARTIS) {
                return validateArtist()
            }
        }

        return true
    }

    // Validate biodata step
    function validateBiodata() {
        let isValid = true

        if (!formData.nama.trim()) {
            errors.nama = 'Nama wajib diisi'
            isValid = false
        }

        if (!formData.tempat_lahir.trim()) {
            errors.tempat_lahir = 'Tempat lahir wajib diisi'
            isValid = false
        }

        if (!formData.tanggal_lahir) {
            errors.tanggal_lahir = 'Tanggal lahir wajib diisi'
            isValid = false
        }

        if (!formData.jenis_kelamin) {
            errors.jenis_kelamin = 'Jenis kelamin wajib dipilih'
            isValid = false
        }

        if (!formData.email.trim()) {
            errors.email = 'Email wajib diisi'
            isValid = false
        }

        if (!formData.no_hp.trim()) {
            errors.no_hp = 'No HP wajib diisi'
            isValid = false
        }

        if (!formData.cluster_id) {
            errors.cluster_id = 'Cluster wajib dipilih'
            isValid = false
        }

        return isValid
    }

    // Validate jalur step
    function validateJalur() {
        if (!formData.pilihan) {
            errors.pilihan = 'Pilih jalur terlebih dahulu'
            return false
        }
        return true
    }

    // Validate crew step
    function validateCrew() {
        let isValid = true

        if (!formData.crewPositions || formData.crewPositions.length === 0) {
            errors.crewPositions = 'Pilih minimal 1 posisi crew'
            isValid = false
        }

        if (formData.pernah_terlibat === null || formData.pernah_terlibat === undefined) {
            errors.pernah_terlibat = 'Pilih apakah pernah terlibat dalam pembuatan film'
            isValid = false
        }

        // Conditional validation: if pernah_terlibat is true, film details are required
        if (formData.pernah_terlibat === true) {
            if (!formData.judul_film.trim()) {
                errors.judul_film = 'Judul film wajib diisi'
                isValid = false
            }
            if (!formData.peran_di_film.trim()) {
                errors.peran_di_film = 'Peran di film wajib diisi'
                isValid = false
            }
        }

        return isValid
    }

    // Validate artist step
    function validateArtist() {
        let isValid = true

        if (!formData.berat_badan) {
            errors.berat_badan = 'Berat badan wajib diisi'
            isValid = false
        }

        if (!formData.tinggi_badan) {
            errors.tinggi_badan = 'Tinggi badan wajib diisi'
            isValid = false
        }

        return isValid
    }

    // Submit form
    async function submitForm() {
        if (!validateCurrentStep()) {
            return false
        }

        isSubmitting.value = true
        error.value = null

        try {
            // Prepare data based on pilihan
            const talentData = {
                nama: formData.nama,
                tempat_lahir: formData.tempat_lahir,
                tanggal_lahir: formData.tanggal_lahir,
                jenis_kelamin: formData.jenis_kelamin,
                email: formData.email,
                no_hp: formData.no_hp,
                asal_sekolah: formData.asal_sekolah,
                provinsi: formData.provinsi,
                kabupaten: formData.kabupaten,
                nisn: formData.nisn,
                instagram: formData.instagram,
                facebook: formData.facebook,
                tiktok: formData.tiktok,
                youtube: formData.youtube,
                cluster_id: formData.cluster_id,
                pilihan: formData.pilihan
            }

            // Add crew or artist specific data
            if (formData.pilihan === AppConfig.JALUR.CREW) {
                talentData.crewPositions = formData.crewPositions
                talentData.pernah_terlibat = formData.pernah_terlibat
                talentData.judul_film = formData.judul_film
                talentData.peran_di_film = formData.peran_di_film
                talentData.genre_film = formData.genre_film
                talentData.minat_kontribusi = formData.minat_kontribusi
            } else if (formData.pilihan === AppConfig.JALUR.ARTIS) {
                talentData.artistData = {
                    berat_badan: formData.berat_badan,
                    tinggi_badan: formData.tinggi_badan,
                    berkacamata: formData.berkacamata,
                    warna_kulit: formData.warna_kulit,
                    jenis_rambut: formData.jenis_rambut,
                    pernah_main_film: formData.pernah_main_film,
                    judul_film: formData.judul_film || null,
                    genre_favorit: formData.genre_favorit
                }
            }

            // Submit to service
            const { data, error: err } = await createTalent(talentData)

            if (err) throw err

            // Success - redirect to success page
            router.push('/success')
            return true
        } catch (err) {
            error.value = handleError(err)
            console.error('Error submitting form:', err)
            return false
        } finally {
            isSubmitting.value = false
        }
    }

    return {
        currentStep,
        formData,
        errors,
        isSubmitting,
        error,
        nextStep,
        prevStep,
        goToStep,
        submitForm,
        validateCurrentStep
    }
}
