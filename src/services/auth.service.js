import supabase from './supabaseClient'

/**
 * Login admin user
 */
export async function login(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) throw error

        // Check if user has admin profile
        const { data: profile, error: profileError } = await getAdminProfile(data.user.id)

        if (profileError || !profile) {
            await supabase.auth.signOut()
            throw new Error('User is not an admin')
        }

        return { data: { ...data, profile }, error: null }
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
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        return { error: null }
    } catch (error) {
        console.error('Error logging out:', error)
        return { error }
    }
}

/**
 * Get current session
 */
export async function getCurrentUser() {
    try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) throw error
        if (!session) return { data: null, error: null }

        // Get admin profile
        const { data: profile, error: profileError } = await getAdminProfile(session.user.id)

        if (profileError) throw profileError

        return { data: { user: session.user, profile }, error: null }
    } catch (error) {
        console.error('Error getting current user:', error)
        return { data: null, error }
    }
}

/**
 * Get admin profile from admin_profiles table
 */
export async function getAdminProfile(userId) {
    try {
        const { data, error } = await supabase
            .from('admin_profiles')
            .select('*')
            .eq('id', userId)
            .single()

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error fetching admin profile:', error)
        return { data: null, error }
    }
}
