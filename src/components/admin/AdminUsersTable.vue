<script setup>
import { useAuthStore } from '@/stores/auth'

// Traemos la store global de Pinia
const authStore = useAuthStore()

// Manejamos el cambio del interruptor de forma limpia
const alternarAcceso = (email) => {
  authStore.toggleBlockUser(email)
}
</script>

<template>
  <div class="users-table-container rounded-4 bg-white border shadow-sm p-4">
    <table class="table align-middle mb-0 custom-table">
      <thead>
        <tr class="text-uppercase tracking-wider">
          <th scope="col" class="pb-3 border-0 ps-3">Usuario</th>
          <th scope="col" class="pb-3 border-0">Rol</th>
          <th scope="col" class="pb-3 border-0">Estado</th>
          <th scope="col" class="pb-3 border-0 text-end pe-4">Acceso</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in authStore.users" :key="user.email" class="align-middle">
          <td class="py-3 border-bottom border-light ps-3">
            <div class="d-flex align-items-center gap-3">
              <div class="avatar-user-fallback d-flex align-items-center justify-content-center rounded-circle fw-bold text-white">
                {{ user.name.charAt(0) }}
              </div>
              <div class="d-flex flex-column">
                <span class="fw-bold text-dark lh-sm mb-1">{{ user.name }}</span>
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
              :class="!user.isBlocked ? 'status-allowed' : 'status-restricted'"
            >
              {{ !user.isBlocked ? 'Acceso permitido' : 'Acceso restringido' }}
            </span>
          </td>
          
          <td class="py-3 border-bottom border-light text-end pe-4">
            <div class="form-check form-switch d-inline-block m-0 align-middle">
              <input 
                class="form-check-input custom-switch" 
                type="checkbox" 
                role="switch" 
                :checked="!user.isBlocked"
                :disabled="user.role === 'admin'"
                @change="alternarAcceso(user.email)"
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
  border-color: #f1f3f7 !important;
}

.custom-table thead th {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: #949aae;
}

.avatar-user-fallback {
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  background: linear-gradient(135deg, #a78bfa, #c084fc);
  font-size: 14px;
}

.bg-purple { background-color: #635bff; }
.badge-status {
  display: inline-block;
  padding: 6px 14px;
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

.custom-switch {
  width: 2.8em;
  height: 1.4em;
  cursor: pointer;
  background-color: #e2e8f0;
  border-color: #cbd5e1;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:checked {
    background-color: #7c4dff;
    border-color: #7c4dff;
  }

  &:focus {
    box-shadow: 0 0 0 0.25rem rgba(124, 77, 255, 0.15);
  }
}
</style>