import supabase from './supabaseClient'

/**
 * Get all active crew positions
 */
export async function getCrewPositions() {
    try {
        const { data, error } = await supabase
            .from('crew_positions')
            .select('*')
            .eq('is_active', true)
            .order('name', { ascending: true })

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error fetching crew positions:', error)
        return { data: null, error }
    }
}

/**
 * Create new crew position (admin only)
 */
export async function createCrewPosition(positionData) {
    try {
        const { data, error } = await supabase
            .from('crew_positions')
            .insert([positionData])
            .select()
            .single()

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error creating crew position:', error)
        return { data: null, error }
    }
}

/**
 * Update crew position (admin only)
 */
export async function updateCrewPosition(id, positionData) {
    try {
        const { data, error } = await supabase
            .from('crew_positions')
            .update(positionData)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error updating crew position:', error)
        return { data: null, error }
    }
}

/**
 * Delete crew position (admin only)
 */
export async function deleteCrewPosition(id) {
    try {
        const { error } = await supabase
            .from('crew_positions')
            .delete()
            .eq('id', id)

        if (error) throw error
        return { error: null }
    } catch (error) {
        console.error('Error deleting crew position:', error)
        return { error }
    }
}
