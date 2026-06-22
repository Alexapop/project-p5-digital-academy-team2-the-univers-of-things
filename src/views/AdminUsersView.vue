<script setup>
import { ref } from 'vue'
import DashboardSidebar from '@/components/common/DashboardSidebar.vue'
import AdminUsersTable from '@/components/admin/AdminUsersTable.vue'

// Enlaces cortos del Administrador que configuramos al inicio
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
  <div class="admin-layout">
    <DashboardSidebar 
      title="ADMIN PANEL" 
      :links="adminLinks" 
      :userData="adminData" 
    />

    <div class="d-flex flex-column flex-grow-1 min-vh-100 bg-light">
      
      <header class="bg-white border-bottom px-5 py-3 d-flex justify-content-between align-items-center">
        <span class="fw-semibold text-secondary">Panel de Administración</span>
        <a href="/" class="text-decoration-none text-secondary small d-flex align-items-center gap-1">
          &larr; Volver al sitio
        </a>
      </header>

      <main class="flex-grow-1 px-5 py-4">
        <div class="mb-4 pt-2">
          <h1 class="fw-bold text-dark display-6 m-0">Usuarios</h1>
          <p class="text-muted mt-1">Gestiona el acceso de los usuarios registrados.</p>
        </div>
        
        <AdminUsersTable />
      </main>

      <footer class="bg-light px-5 py-3 border-top mt-auto">
        <span class="text-muted small">&copy; 2026 OtakuHub &mdash; Panel privado.</span>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
}
</style>