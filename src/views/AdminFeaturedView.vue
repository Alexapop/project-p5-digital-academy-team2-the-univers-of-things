<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import AdminFeaturedManager from '@/components/admin/AdminFeaturedManager.vue'
</script>

<template>
  <div class="admin-layout">
    <AdminSidebar />

    <div class="d-flex flex-column flex-grow-1 min-vh-100 bg-light">
      
      <header class="bg-white border-bottom px-5 py-3 d-flex justify-content-between align-items-center">
        <span class="fw-semibold text-secondary">Panel de Administración</span>
        <a href="/" class="text-decoration-none text-secondary small">&larr; Volver al sitio</a>
      </header>

      <main class="flex-grow-1 px-5 py-5" style="max-width: 1000px;">
        <AdminFeaturedManager />
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
}
</style>