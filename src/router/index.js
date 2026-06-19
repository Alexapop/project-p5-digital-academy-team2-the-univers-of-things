import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      path: '/admin/usuarios',
      name: 'admin-users',
      component: () => import('@/views/AdminUsersView.vue'),
    },
    {
      path: '/admin/destacados',
      name: 'admin-featured',
      component: () => import('@/views/AdminFeaturedView.vue'),
    },
    {
      path: '/anime/:id',
      name: 'anime-detail',
      component: () => import('@/views/DetailView.vue')
    },
    // 👤 Añadimos tu nueva ruta para el panel de usuario
    {
      path: '/dashboard/perfil',
      name: 'user-profile',
      component: () => import('@/views/UserProfileView.vue')
    },
  ],
})

export default router