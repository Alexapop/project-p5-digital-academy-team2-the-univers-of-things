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
    
    // 🏢 Agrupamos la administración bajo un único Layout con la barra lateral
    {
      path: '/admin',
      component: () => import('@/views/AdminLayoutView.vue'), // Tu contenedor común
      redirect: '/admin/destacados', // Si entran a /admin los manda aquí por defecto
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
    // 👤 Panel de usuario
    {
      path: '/dashboard/perfil',
      name: 'user-profile',
      component: () => import('@/views/UserProfileView.vue')
    },
  ],
})

export default router