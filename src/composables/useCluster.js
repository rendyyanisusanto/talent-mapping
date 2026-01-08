import { ref, computed } from 'vue'
import { getClusters, getClusterByCode } from '@/services/cluster.service'

export function useCluster(clusterCodeFromUrl = null) {
    const clusters = ref([])
    const selectedCluster = ref(null)
    const isClusterLocked = ref(false)
    const loading = ref(false)
    const error = ref(null)

    // Load clusters from API
    async function loadClusters() {
        loading.value = true
        error.value = null

        try {
            const { data, error: err } = await getClusters()

            if (err) throw err

            clusters.value = data || []

            // Auto-select if cluster code provided
            if (clusterCodeFromUrl) {
                await loadClusterByCode(clusterCodeFromUrl)
            }
        } catch (err) {
            error.value = err.message
            console.error('Error loading clusters:', err)
        } finally {
            loading.value = false
        }
    }

    // Load specific cluster by code and lock it
    async function loadClusterByCode(code) {
        loading.value = true
        error.value = null

        try {
            const { data, error: err } = await getClusterByCode(code)

            if (err) throw err

            if (data) {
                selectedCluster.value = data.id
                isClusterLocked.value = true
            } else {
                error.value = 'Cluster tidak ditemukan'
            }
        } catch (err) {
            error.value = err.message
            console.error('Error loading cluster by code:', err)
        } finally {
            loading.value = false
        }
    }

    // Get cluster name by ID
    const selectedClusterName = computed(() => {
        if (!selectedCluster.value || !clusters.value.length) return ''
        const cluster = clusters.value.find(c => c.id === selectedCluster.value)
        return cluster?.name || ''
    })

    return {
        clusters,
        selectedCluster,
        isClusterLocked,
        loading,
        error,
        selectedClusterName,
        loadClusters,
        loadClusterByCode
    }
}
