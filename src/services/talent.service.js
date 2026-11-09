import apiClient from './apiClient'

/**
 * Create new talent with crew or artist data
 */
export async function createTalent(talentData) {
    try {
        const res = await apiClient.post('/talents', talentData)
        if (res.error) throw res.error
        return { data: res.data, error: null }
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
        const query = new URLSearchParams()
        if (filters.cluster_id) query.append('cluster_id', filters.cluster_id)
        if (filters.pilihan) query.append('pilihan', filters.pilihan)
        if (filters.search) query.append('search', filters.search)
        if (filters.limit) query.append('limit', filters.limit)

        const queryString = query.toString() ? `?${query.toString()}` : ''
        const res = await apiClient.get(`/talents${queryString}`)

        if (res.error) throw res.error
        return { data: res.data, error: null }
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
        const res = await apiClient.get(`/talents/${id}`)
        if (res.error) throw res.error
        return { data: res.data, error: null }
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
        const res = await apiClient.get('/talents/count')
        if (res.error) throw res.error
        return { count: res.count ?? res.data?.count ?? 0, error: null }
    } catch (error) {
        console.error('Error counting talents:', error)
        return { count: 0, error }
    }
}
