<script setup>
import { RouterLink } from 'vue-router'
import AdminFeaturedManager from '@/components/admin/AdminFeaturedManager.vue'
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 min-vh-100 overflow-hidden bg-light">
    <header class="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
      <span class="fw-semibold text-dark fs-5">Panel de Administraci&oacute;n</span>
      <RouterLink to="/" class="text-decoration-none text-secondary small text-nowrap">
        &larr; Volver al sitio
      </RouterLink>
    </header>

    <main class="flex-grow-1 p-4 p-md-5">
      <AdminFeaturedManager />
    </main>
  </div>
</template>

<style scoped>
.d-flex {
  display: flex !important;
}
</style>
