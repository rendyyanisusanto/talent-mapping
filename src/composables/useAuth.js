import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import * as authService from '@/services/auth.service'
import { handleError } from '@/utils/errorHandler'

export function useAuth() {
    const router = useRouter()

    const user = ref(null)
    const profile = ref(null)
    const loading = ref(false)
    const error = ref(null)

    // Check if user is authenticated
    const isAuthenticated = computed(() => !!user.value)

    // Check if user is admin
    const isAdmin = computed(() => !!profile.value)

    // Login function
    async function login(email, password) {
        loading.value = true
        error.value = null

        try {
            const { data, error: err } = await authService.login(email, password)

            if (err) throw err

            user.value = data.user
            profile.value = data.profile

            return true
        } catch (err) {
            error.value = handleError(err)
            console.error('Login error:', err)
            return false
        } finally {
            loading.value = false
        }
    }

    // Logout function
    async function logout() {
        loading.value = true
        error.value = null

        try {
            const { error: err } = await authService.logout()

            if (err) throw err

            user.value = null
            profile.value = null

            router.push('/admin/login')
        } catch (err) {
            error.value = handleError(err)
            console.error('Logout error:', err)
        } finally {
            loading.value = false
        }
    }

    // Load current user
    async function loadUser() {
        loading.value = true
        error.value = null

        try {
            const { data, error: err } = await authService.getCurrentUser()

            if (err) throw err

            if (data) {
                user.value = data.user
                profile.value = data.profile
            }

            return !!data
        } catch (err) {
            error.value = handleError(err)
            console.error('Load user error:', err)
            return false
        } finally {
            loading.value = false
        }
    }

    return {
        user,
        profile,
        loading,
        error,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        loadUser
    }
}
