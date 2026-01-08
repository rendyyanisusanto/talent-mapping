/**
 * Centralized error handler
 */
export function handleError(error) {
    console.error('Application Error:', error)

    // Extract user-friendly message
    let message = 'Terjadi kesalahan. Silakan coba lagi.'

    if (error?.message) {
        message = error.message
    } else if (typeof error === 'string') {
        message = error
    }

    // Handle specific Supabase errors
    if (error?.code) {
        switch (error.code) {
            case '23505':
                message = 'Data sudah ada di sistem'
                break
            case '23503':
                message = 'Data tidak valid'
                break
            case 'PGRST116':
                message = 'Data tidak ditemukan'
                break
            default:
                message = error.message || message
        }
    }

    return message
}

/**
 * Show error notification
 */
export function showError(error) {
    const message = handleError(error)
    // This will be used with notification component
    return message
}
