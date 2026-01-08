import supabase from './supabaseClient'

/**
 * Get all active clusters
 */
export async function getClusters() {
    try {
        const { data, error } = await supabase
            .from('clusters')
            .select('*')
            .eq('is_active', true)
            .order('name', { ascending: true })

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error fetching clusters:', error)
        return { data: null, error }
    }
}

/**
 * Get cluster by code (untuk URL parameter)
 */
export async function getClusterByCode(code) {
    try {
        const { data, error } = await supabase
            .from('clusters')
            .select('*')
            .eq('code', code)
            .eq('is_active', true)
            .single()

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error fetching cluster by code:', error)
        return { data: null, error }
    }
}

/**
 * Create new cluster (admin only)
 */
export async function createCluster(clusterData) {
    try {
        const { data, error } = await supabase
            .from('clusters')
            .insert([clusterData])
            .select()
            .single()

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error creating cluster:', error)
        return { data: null, error }
    }
}

/**
 * Update cluster (admin only)
 */
export async function updateCluster(id, clusterData) {
    try {
        const { data, error } = await supabase
            .from('clusters')
            .update(clusterData)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error updating cluster:', error)
        return { data: null, error }
    }
}

/**
 * Delete cluster (admin only)
 */
export async function deleteCluster(id) {
    try {
        const { error } = await supabase
            .from('clusters')
            .delete()
            .eq('id', id)

        if (error) throw error
        return { error: null }
    } catch (error) {
        console.error('Error deleting cluster:', error)
        return { error }
    }
}
