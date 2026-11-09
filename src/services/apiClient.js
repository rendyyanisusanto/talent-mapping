const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

class ApiClient {
    getToken() {
        return localStorage.getItem('kinarya_auth_token')
    }

    setToken(token) {
        if (token) {
            localStorage.setItem('kinarya_auth_token', token)
        } else {
            localStorage.removeItem('kinarya_auth_token')
        }
    }

    clearToken() {
        localStorage.removeItem('kinarya_auth_token')
    }

    async request(endpoint, options = {}) {
        const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
        
        const headers = {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        }

        const token = this.getToken()
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            })

            const json = await response.json().catch(() => null)

            if (!response.ok) {
                const errorMessage = json?.message || `Request failed with status ${response.status}`
                return {
                    data: null,
                    error: new Error(errorMessage),
                    status: response.status
                }
            }

            return {
                data: json?.data !== undefined ? json.data : json,
                count: json?.count !== undefined ? json.count : undefined,
                error: null,
                status: response.status
            }
        } catch (error) {
            return {
                data: null,
                error,
                status: 0
            }
        }
    }

    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' })
    }

    post(endpoint, body, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body)
        })
    }

    put(endpoint, body, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body)
        })
    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' })
    }
}

export const apiClient = new ApiClient()
export default apiClient

