<script setup>
import { RouterLink, useRouter } from 'vue-router'

// Inicializamos el enrutador para poder redirigir al usuario
const router = useRouter()

// Definimos las props con valores por defecto por si acaso
defineProps({
  title: {
    type: String,
    default: 'USER DASHBOARD'
  },
  links: {
    type: Array,
    required: true,
    // Estructura esperada: [{ to: '/ruta', label: 'Texto', icon: 'bi-person' }]
  },
  userData: {
    type: Object,
    default: () => ({
      name: 'Sora Tanaka',
      email: 'user@otakuhub.dev',
      fallback: 'ST'
    })
  }
})

// Función para ejecutar el cierre de sesión
const logout = () => {
  // Nota: Aquí es donde más adelante borrarás los tokens de autenticación o limpiarás Pinia
  alert('Cerrando sesión...')
  router.push('/') // Te redirige automáticamente a la Home
}
</script>

<template>
  <aside class="admin-sidebar d-flex flex-column justify-content-between p-4 text-white">
    <div>
      <div class="mb-4 pt-2">
        <RouterLink to="/" class="logo">
          <span class="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
              <g stroke="#fcfcfc" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.667" clip-path="url(#a)">
                <path d="M9.18 2.345a.833.833 0 0 1 1.639 0l.876 4.632a1.67 1.67 0 0 0 1.328 1.328l4.632.876a.833.833 0 0 1 0 1.638l-4.632.876a1.67 1.67 0 0 0-1.328 1.328l-.876 4.632a.833.833 0 0 1-1.638 0l-.876-4.632a1.67 1.67 0 0 0-1.328-1.328l-4.632-.876a.833.833 0 0 1 0-1.638l4.632-.876a1.67 1.67 0 0 0 1.328-1.328zM16.667 1.667V5M18.333 3.333H15M3.333 18.333a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333"/>
              </g>
              <defs>
                <clipPath id="a"><path fill="#fff" d="M0 0h20v20H0z"/></clipPath>
              </defs>
            </svg>
          </span>
          <div class="d-flex flex-column lh-sm">
            <span class="logo-text">OtakuHub</span>
            <span class="logo-sub text-uppercase">{{ title }}</span>
          </div>
        </RouterLink>
      </div>

      <nav class="nav flex-column gap-2 mt-4">
        <RouterLink 
          v-for="(link, index) in links" 
          :key="index"
          :to="link.to" 
          class="nav-btn d-flex align-items-center gap-3 px-3 py-2.5 rounded-3"
        >
          <i :class="['bi', link.icon, 'fs-5']"></i> 
          <span>{{ link.label }}</span>
        </RouterLink>
      </nav>
    </div>

    <div class="sidebar-footer">
      <div class="d-flex align-items-center gap-3 mb-3">
        <div class="avatar-admin-fallback d-flex align-items-center justify-content-center rounded-circle fw-bold text-white shadow-sm">
          {{ userData.fallback }}
        </div>
        <div>
          <p class="m-0 fw-bold small text-white">{{ userData.name }}</p>
          <small class="text-muted d-block" style="font-size: 0.8rem;">{{ userData.email }}</small>
        </div>
      </div>
      
      <button @click="logout" class="btn-logout d-flex align-items-center gap-3 bg-transparent border-0 p-0 text-start">
        <i class="bi bi-box-arrow-left fs-5"></i>
        <span class="small fw-semibold">Cerrar sesión</span>
      </button>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.admin-sidebar {
  width: 260px;
  background-color: #0c0f17;
  height: 100vh;
  position: sticky;
  top: 0;
}
.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  &-icon {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #7c4dff, #b766f2);
  }
  &-text {
    font-size: 22px;
    font-weight: 700;
  }
  &-sub {
    font-size: 10px;
    font-weight: 600;
    color: #5c6275;
    letter-spacing: 0.5px;
  }
}
.nav-btn {
  color: #949aae;
  text-decoration: none;
  transition: all 0.2s ease;
  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.02);
  }
  &.router-link-exact-active {
    background-color: #161b26;
    color: #b766f2 !important;
    i { color: #b766f2; }
  }
}
.btn-logout {
  color: #949aae;
  transition: color 0.2s ease;
  cursor: pointer;
  &:hover { color: #ffffff; }
}
.avatar-admin-fallback {
  width: 42px;
  height: 42px;
  min-width: 42px;
  min-height: 42px;
  background: linear-gradient(135deg, #7c4dff, #b766f2);
  font-size: 14px;
  letter-spacing: 0.5px;
}
</style>