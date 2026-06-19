<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router' // Aseguramos la importación de RouterView
import DashboardSidebar from '@/components/common/DashboardSidebar.vue'

// 🔥 CAMBIO AQUÍ: Textos cortos para que quede limpio y no se líe el diseño
const adminLinks = ref([
  { to: '/admin/usuarios', label: 'Usuarios', icon: 'bi-people' },
  { to: '/admin/destacados', label: 'Destacados', icon: 'bi-star' }
])

const adminData = ref({
  name: 'Akira Admin',
  email: 'admin@otakuhub.dev',
  fallback: 'AA',
  avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Akira'
})
</script>

<template>
  <div class="d-flex w-100 bg-light" style="min-height: 100vh;">
    <DashboardSidebar 
      title="ADMIN PANEL" 
      :links="adminLinks" 
      :userData="adminData" 
    />
    <main class="flex-grow-1 p-4">
      <RouterView />
    </main>
  </div>
</template>