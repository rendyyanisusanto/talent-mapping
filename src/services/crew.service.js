import apiClient from './apiClient'

/**
 * Get all active crew positions
 */
export async function getCrewPositions(params = {}) {
    const query = new URLSearchParams()
    if (params.all) query.append('all', 'true')
    if (params.is_active !== undefined) query.append('is_active', params.is_active)

    const queryString = query.toString() ? `?${query.toString()}` : ''
    return apiClient.get(`/crew-positions${queryString}`)
}

/**
 * Create new crew position (admin only)
 */
export async function createCrewPosition(positionData) {
    return apiClient.post('/crew-positions', positionData)
}

/**
 * Update crew position (admin only)
 */
export async function updateCrewPosition(id, positionData) {
    return apiClient.put(`/crew-positions/${id}`, positionData)
}

/**
 * Delete crew position (admin only)
 */
export async function deleteCrewPosition(id) {
    return apiClient.delete(`/crew-positions/${id}`)
}
