<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import AdminFeaturedManager from '@/components/admin/AdminFeaturedManager.vue'
</script>

<template>
  <div class="d-flex min-vh-100 bg-light w-100 m-0 p-0">
    
    <AdminSidebar />

    <div class="d-flex flex-column flex-grow-1 min-vh-100 overflow-hidden">
      
      <header class="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
        <span class="fw-semibold text-dark fs-5">Panel de Administración</span>
        <a href="/" class="text-decoration-none text-secondary small text-nowrap">← Volver al sitio</a>
      </header>

      <main class="flex-grow-1 p-4 p-md-5">
        <AdminFeaturedManager />
      </main>

    </div>
  </div>
</template>

<style scoped>
/* Evita que el flex horizontal rompa las proporciones */
.d-flex {
  display: flex !important;
}
</style>