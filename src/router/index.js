import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login', 
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/admin',
      component: () => import('@/views/AdminLayoutView.vue'),
      redirect: '/admin/destacados',
      children: [
        {
          path: 'usuarios',
          name: 'admin-users',
          component: () => import('@/views/AdminUsersView.vue'),
        },
        {
          path: 'destacados',
          name: 'admin-featured',
          component: () => import('@/views/AdminFeaturedView.vue'),
        },
      ]
    },
    {
      path: '/anime/:id',
      name: 'anime-detail',
      component: () => import('@/views/DetailView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/dashboard/perfil',
      name: 'user-profile',
      component: () => import('@/views/UserProfileView.vue')
    },
    {
      path: '/dashboard/favoritos',
      name: 'user-favorites',
      component: () => import('@/views/UserFavoritesView.vue')
    },
  ],
})

// 🔥 Guardián de rutas global actualizado (Sin la función deprecada next)
router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  const currentUser = authStore.currentUser

  const isAdminRoute = to.path.startsWith('/admin')
  const isDashboardRoute = to.path.startsWith('/dashboard')

  // Si intenta ir a admin y no lo es, devolvemos la ruta de redirección directa
  if (isAdminRoute && currentUser?.role !== 'admin') {
    return '/'
  }

  // Si intenta ir a rutas de usuario sin estar logueado, al login directamente
  if (isDashboardRoute && !currentUser) {
    return '/login'
  }

  // Si pasa los filtros, no retornar nada equivale a dar luz verde para continuar
})

export default router