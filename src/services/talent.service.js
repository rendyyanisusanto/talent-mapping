import supabase from './supabaseClient'

/**
 * Create new talent with crew or artist data
 */
export async function createTalent(talentData) {
    try {
        const { pilihan, crewPositions, artistData, ...baseData } = talentData

        // 1. Insert ke tabel talents
        const { data: talent, error: talentError } = await supabase
            .from('talents')
            .insert([{ ...baseData, pilihan }])
            .select()
            .single()

        if (talentError) throw talentError

        // 2. Jika CREW, insert ke talent_crews
        if (pilihan === 'CREW' && crewPositions && crewPositions.length > 0) {
            const crewData = crewPositions.map(positionId => ({
                talent_id: talent.id,
                crew_position_id: positionId
            }))

            const { error: crewError } = await supabase
                .from('talent_crews')
                .insert(crewData)

            if (crewError) throw crewError
        }

        // 3. Jika ARTIS, insert ke talent_artists
        if (pilihan === 'ARTIS' && artistData) {
            const { error: artistError } = await supabase
                .from('talent_artists')
                .insert([{
                    talent_id: talent.id,
                    ...artistData
                }])

            if (artistError) throw artistError
        }

        return { data: talent, error: null }
    } catch (error) {
        console.error('Error creating talent:', error)
        return { data: null, error }
    }
}

/**
 * Get all talents with filters (admin only)
 */
export async function getTalents(filters = {}) {
    try {
        let query = supabase
            .from('talents')
            .select(`
        *,
        cluster:clusters(id, name, code),
        talent_crews(
          id,
          crew_position:crew_positions(id, name)
        ),
        talent_artists(*)
      `)
            .order('created_at', { ascending: false })

        // Apply filters
        if (filters.cluster_id) {
            query = query.eq('cluster_id', filters.cluster_id)
        }
        if (filters.pilihan) {
            query = query.eq('pilihan', filters.pilihan)
        }
        if (filters.search) {
            query = query.or(`nama.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
        }

        const { data, error } = await query

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error fetching talents:', error)
        return { data: null, error }
    }
}

/**
 * Get single talent by ID (admin only)
 */
export async function getTalentById(id) {
    try {
        const { data, error } = await supabase
            .from('talents')
            .select(`
        *,
        cluster:clusters(id, name, code),
        talent_crews(
          id,
          crew_position:crew_positions(id, name)
        ),
        talent_artists(*)
      `)
            .eq('id', id)
            .single()

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error fetching talent:', error)
        return { data: null, error }
    }
}

/**
 * Get total talent count (admin dashboard)
 */
export async function getTalentCount() {
    try {
        const { count, error } = await supabase
            .from('talents')
            .select('*', { count: 'exact', head: true })

        if (error) throw error
        return { count, error: null }
    } catch (error) {
        console.error('Error counting talents:', error)
        return { count: 0, error }
    }
}
