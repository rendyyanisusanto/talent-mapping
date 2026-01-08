export function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

export function isValidPhone(phone) {
    // Indonesian phone number format
    const re = /^(\+62|62|0)[0-9]{9,12}$/
    return re.test(phone.replace(/[\s-]/g, ''))
}

export function isValidNISN(nisn) {
    // NISN must be 10 digits
    return /^\d{10}$/.test(nisn)
}

export function isRequired(value) {
    if (typeof value === 'string') {
        return value.trim().length > 0
    }
    return value !== null && value !== undefined && value !== ''
}

export function minLength(value, min) {
    if (typeof value === 'string') {
        return value.trim().length >= min
    }
    return false
}

export function maxLength(value, max) {
    if (typeof value === 'string') {
        return value.trim().length <= max
    }
    return false
}

export function isValidUrl(url) {
    if (!url) return true // Optional
    try {
        new URL(url.startsWith('http') ? url : `https://${url}`)
        return true
    } catch {
        return false
    }
}
