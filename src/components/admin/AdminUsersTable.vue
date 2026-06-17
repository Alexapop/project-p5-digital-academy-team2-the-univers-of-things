<script setup>
import { ref } from 'vue'

// Mock data con los datos exactos de tu captura de Figma
const users = ref([
  { id: 1, name: 'Akira Admin', email: 'admin@otakuhub.dev', role: 'admin', allowed: true, avatar: 'https://avatar.iran.liara.run/public/git/boy' },
  { id: 2, name: 'Sora Tanaka', email: 'user@otakuhub.dev', role: 'customer', allowed: true, avatar: 'https://avatar.iran.liara.run/public/git/girl' },
  { id: 3, name: 'Ken Restricted', email: 'blocked@otakuhub.dev', role: 'customer', allowed: false, avatar: 'https://avatar.iran.liara.run/public/30' }
])
</script>

<template>
  <div class="users-table-container rounded-4 bg-white border shadow-sm p-4">
    <table class="table align-middle mb-0 custom-table">
      <thead>
        <tr class="text-uppercase text-secondary tracking-wider fs-7">
          <th scope="col" class="pb-3 border-0">Usuario</th>
          <th scope="col" class="pb-3 border-0">Rol</th>
          <th scope="col" class="pb-3 border-0">Estado</th>
          <th scope="col" class="pb-3 border-0 text-end pe-3">Acceso</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="align-middle">
          <td class="py-3 border-bottom border-light">
            <div class="d-flex align-items-center gap-3">
              <img :src="user.avatar" alt="Avatar" class="rounded-circle bg-light border" width="40" height="40">
              <div class="d-flex flex-column">
                <span class="fw-bold text-dark lh-sm mb-0.5">{{ user.name }}</span>
                <span class="text-muted small lh-sm">{{ user.email }}</span>
              </div>
            </div>
          </td>
          
          <td class="py-3 border-bottom border-light">
            <span 
              class="badge rounded-pill px-3 py-1.5 fw-semibold"
              :class="user.role === 'admin' ? 'bg-purple text-white' : 'bg-secondary-subtle text-dark-emphasis'"
            >
              {{ user.role }}
            </span>
          </td>
          
          <td class="py-3 border-bottom border-light">
            <span 
              class="badge-status fw-semibold"
              :class="user.allowed ? 'status-allowed' : 'status-restricted'"
            >
              {{ user.allowed ? 'Acceso permitido' : 'Acceso restringido' }}
            </span>
          </td>
          
          <td class="py-3 border-bottom border-light text-end pe-3">
            <div class="form-check form-switch d-inline-block m-0 align-middle">
              <input 
                class="form-check-input custom-switch" 
                type="checkbox" 
                role="switch" 
                v-model="user.allowed"
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.users-table-container {
  border-color: #e9ecef !important;
}

.custom-table {
  thead th {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: #8a92a6;
  }
}

// Estilos de los roles
.bg-purple {
  background-color: #635bff; // El tono lila del badge en tu captura
}

// Badges de estado con bordes (Píldoras personalizadas)
.badge-status {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  
  &.status-allowed {
    background-color: #f0fdf4;
    color: #16a34a;
    border: 1px solid #bbf7d0;
  }
  
  &.status-restricted {
    background-color: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
  }
}

// Interruptor lila corporativo
.custom-switch {
  width: 2.8em;
  height: 1.4em;
  cursor: pointer;
  background-color: #e2e8f0;
  border-color: #cbd5e1;
  
  &:checked {
    background-color: #7c4dff;
    border-color: #7c4dff;
  }
  
  &:focus {
    box-shadow: 0 0 0 0.25rem rgba(124, 77, 255, 0.25);
  }
}
</style>