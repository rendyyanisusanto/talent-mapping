import apiClient from './apiClient'

/**
 * Login admin user
 */
export async function login(email, password) {
    try {
        const res = await apiClient.post('/auth/login', {
            email: email.trim(),
            password
        })

        if (res.error) throw res.error

        const { user, profile, token } = res.data

        if (token) {
            apiClient.setToken(token)
        }

        return { data: { user, profile, token }, error: null }
    } catch (error) {
        console.error('Error logging in:', error)
        return { data: null, error }
    }
}

/**
 * Logout current user
 */
export async function logout() {
    try {
        await apiClient.post('/auth/logout').catch(() => {})
        apiClient.clearToken()
        return { error: null }
    } catch (error) {
        apiClient.clearToken()
        console.error('Error logging out:', error)
        return { error }
    }
}

/**
 * Get current session / user
 */
export async function getCurrentUser() {
    try {
        const token = apiClient.getToken()
        if (!token) {
            return { data: null, error: null }
        }

        const res = await apiClient.get('/auth/me')

        if (res.error) {
            // Token is expired or invalid
            apiClient.clearToken()
            return { data: null, error: res.error }
        }

        return {
            data: {
                user: res.data.user,
                profile: res.data.profile
            },
            error: null
        }
    } catch (error) {
        apiClient.clearToken()
        console.error('Error getting current user:', error)
        return { data: null, error }
    }
}

/**
 * Get admin profile
 */
export async function getAdminProfile(userId) {
    try {
        const res = await getCurrentUser()
        if (res.error) throw res.error
        return { data: res.data?.profile || null, error: null }
    } catch (error) {
        console.error('Error fetching admin profile:', error)
        return { data: null, error }
    }
}
