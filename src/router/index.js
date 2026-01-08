import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const routes = [
    // Public Routes
    {
        path: '/',
        name: 'register',
        component: () => import('@/views/public/RegisterView.vue'),
        meta: { public: true }
    },
    {
        path: '/success',
        name: 'success',
        component: () => import('@/views/public/SuccessView.vue'),
        meta: { public: true }
    },
    {
        path: '/:cluster',
        name: 'register-cluster',
        component: () => import('@/views/public/RegisterView.vue'),
        meta: { public: true },
        props: true
    },

    // Admin Routes
    {
        path: '/admin/login',
        name: 'admin-login',
        component: () => import('@/views/admin/LoginView.vue'),
        meta: { public: true }
    },
    {
        path: '/admin',
        redirect: '/admin/dashboard'
    },
    {
        path: '/admin/dashboard',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/DashboardView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/talents',
        name: 'admin-talents',
        component: () => import('@/views/admin/TalentsView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/clusters',
        name: 'admin-clusters',
        component: () => import('@/views/admin/ClustersView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/crew',
        name: 'admin-crew',
        component: () => import('@/views/admin/CrewPositionsView.vue'),
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Route guard
router.beforeEach(async (to, from, next) => {
    const { loadUser, isAuthenticated } = useAuth()

    // Check if route requires authentication
    if (to.meta.requiresAuth) {
        // Try to load user if not already loaded
        if (!isAuthenticated.value) {
            const loaded = await loadUser()

            if (!loaded) {
                // Redirect to login
                next({ name: 'admin-login', query: { redirect: to.fullPath } })
                return
            }
        }
    }

    // If already authenticated and trying to access login page, redirect to dashboard
    if (to.name === 'admin-login' && isAuthenticated.value) {
        next({ name: 'admin-dashboard' })
        return
    }

    next()
})

export default router
