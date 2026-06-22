<script setup>

import AdminUsersTable from '@/components/admin/AdminUsersTable.vue'


</script>

<template>
  <div class="w-100 d-flex flex-column flex-grow-1 min-vh-100 bg-light">
    
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
</template>

<style scoped>
/* Dejamos las clases nativas de Bootstrap para evitar que colapse el diseño */
</style>