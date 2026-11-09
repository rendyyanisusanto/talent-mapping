import apiClient from './apiClient'

/**
 * Get clusters (defaults to all active, or pass { all: true } for all)
 */
export async function getClusters(params = {}) {
    const query = new URLSearchParams()
    if (params.all) query.append('all', 'true')
    if (params.is_active !== undefined) query.append('is_active', params.is_active)
    
    const queryString = query.toString() ? `?${query.toString()}` : ''
    return apiClient.get(`/clusters${queryString}`)
}

/**
 * Get cluster by code (untuk URL parameter pendaftaran /:cluster)
 */
export async function getClusterByCode(code) {
    return apiClient.get(`/clusters/${encodeURIComponent(code)}`)
}

/**
 * Create new cluster (admin only)
 */
export async function createCluster(clusterData) {
    return apiClient.post('/clusters', clusterData)
}

/**
 * Update cluster (admin only)
 */
export async function updateCluster(id, clusterData) {
    return apiClient.put(`/clusters/${id}`, clusterData)
}

/**
 * Delete cluster (admin only)
 */
export async function deleteCluster(id) {
    return apiClient.delete(`/clusters/${id}`)
}
