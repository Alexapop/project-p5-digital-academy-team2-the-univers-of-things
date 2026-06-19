<script setup>
import { ref, onMounted, computed } from 'vue'
import DashboardSidebar from '@/components/common/DashboardSidebar.vue'
import { useAuthStore } from '@/stores/auth' // 1. Importamos el store

const authStore = useAuthStore()

// Variables reactivas locales para enlazar los campos del formulario
const name = ref('')
const email = ref('')
const passwordActual = ref('')
const passwordNueva = ref('')
const passwordConfirmar = ref('')
const avatarSeleccionado = ref('https://api.dicebear.com/7.x/bottts/svg?seed=green')

// 2. Al cargar la pantalla, rellenamos tus inputs con los datos de quien haya iniciado sesión
onMounted(() => {
  if (authStore.currentUser) {
    name.value = authStore.currentUser.name || 'Sora Tanaka'
    email.value = authStore.currentUser.email
    avatarSeleccionado.value = authStore.currentUser.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=green'
  }
})

// 3. Calculamos de forma dinámica el fallback (iniciales) para el Sidebar
const userFallback = computed(() => {
  if (!name.value) return 'ST'
  return name.value.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
})

// Lista de avatares disponibles
const avatars = ref([
  { id: 1, url: 'https://api.dicebear.com/7.x/bottts/svg?seed=1' },
  { id: 2, url: 'https://api.dicebear.com/7.x/bottts/svg?seed=2' },
  { id: 3, url: 'https://api.dicebear.com/7.x/bottts/svg?seed=3' },
  { id: 4, url: 'https://api.dicebear.com/7.x/bottts/svg?seed=4' },
  { id: 5, url: 'https://api.dicebear.com/7.x/bottts/svg?seed=5' },
  { id: 6, url: 'https://api.dicebear.com/7.x/bottts/svg?seed=6' },
  { id: 7, url: 'https://api.dicebear.com/7.x/bottts/svg?seed=7' },
  { id: 8, url: 'https://api.dicebear.com/7.x/bottts/svg?seed=8' }
])

// 4. Acción de guardar datos personales y avatar unidos
const guardarDatos = () => {
  authStore.updateProfile(name.value, null, avatarSeleccionado.value)
  alert('¡Datos personales y avatar actualizados con éxito!')
}

// 5. Acción para actualizar la contraseña de forma segura
const actualizarContrasena = () => {
  // Buscamos la contraseña real en la lista simulada para comprobar
  const userInList = authStore.users.find(u => u.email === email.value)

  if (userInList && passwordActual.value !== userInList.password) {
    alert('La contraseña actual no es correcta.')
    return
  }

  if (passwordNueva.value.length < 6) {
    alert('La nueva contraseña debe tener al menos 6 caracteres.')
    return
  }

  if (passwordNueva.value !== passwordConfirmar.value) {
    alert('Las contraseñas nuevas no coinciden.')
    return
  }

  // Guardamos la nueva contraseña en el Store
  authStore.updateProfile(null, passwordNueva.value, null)
  
  // Limpiamos los inputs del formulario
  passwordActual.value = ''
  passwordNueva.value = ''
  passwordConfirmar.value = ''
  
  alert('¡Contraseña actualizada correctamente!')
}

const seleccionarAvatar = (url) => {
  avatarSeleccionado.value = url
}
</script>

<template>
  <div class="user-dashboard d-flex">
    <DashboardSidebar 
      title="MI DASHBOARD"
      :links="[
        { to: '/dashboard/favoritos', label: 'Favoritos', icon: 'bi-heart' },
        { to: '/dashboard/perfil', label: 'Perfil', icon: 'bi-person-fill' }
      ]"
      :userData="{ name: name, email: email, fallback: userFallback, avatar: avatarSeleccionado }"
    />

    <div class="main-wrapper d-flex flex-column flex-grow-1">
      
      <header class="navbar-top bg-white border-bottom px-4 d-flex justify-content-between align-items-center">
        <span class="fw-bold text-secondary-custom">Mi Dashboard</span>
        <RouterLink to="/" class="btn-back text-decoration-none small text-secondary">
          ← Volver al sitio
        </RouterLink>
      </header>

      <main class="dashboard-content flex-grow-1 p-4 p-md-5">
        <div class="mb-4">
          <h1 class="fw-bold h2 m-0 text-dark-custom">Mi perfil</h1>
          <p class="text-muted m-0">Gestiona tus datos y avatar.</p>
        </div>

        <div class="row g-4">
          <div class="col-12 col-xl-8">
            <div class="card border-0 shadow-sm p-4 bg-white rounded-4">
              
              <h5 class="fw-bold mb-4 block-title">Datos personales</h5>
              <form @submit.prevent="guardarDatos" class="mb-4">
                <div class="mb-3">
                  <label class="form-label text-muted small fw-semibold">Nombre</label>
                  <input v-model="name" type="text" class="form-control custom-input py-2.5 px-3" required />
                </div>
                <div class="mb-4">
                  <label class="form-label text-muted small fw-semibold">Email</label>
                  <input v-model="email" type="email" class="form-control custom-input py-2.5 px-3" required disabled />
                </div>
                <button type="submit" class="btn btn-purple px-4 py-2 fw-semibold rounded-3">
                  Guardar cambios
                </button>
              </form>

              <hr class="my-4 text-muted opacity-25" />

              <h5 class="fw-bold mb-4 block-title">Cambiar contraseña</h5>
              <form @submit.prevent="actualizarContrasena">
                <div class="row g-3 mb-4">
                  <div class="col-12 col-md-4">
                    <label class="form-label text-muted small fw-semibold">Actual</label>
                    <input v-model="passwordActual" type="password" class="form-control custom-input py-2.5 px-3" required />
                  </div>
                  <div class="col-12 col-md-4">
                    <label class="form-label text-muted small fw-semibold">Nueva</label>
                    <input v-model="passwordNueva" type="password" class="form-control custom-input py-2.5 px-3" required />
                  </div>
                  <div class="col-12 col-md-4">
                    <label class="form-label text-muted small fw-semibold">Confirmar</label>
                    <input v-model="passwordConfirmar" type="password" class="form-control custom-input py-2.5 px-3" required />
                  </div>
                </div>
                <button type="submit" class="btn btn-purple px-4 py-2 fw-semibold rounded-3">
                  Actualizar contraseña
                </button>
              </form>

            </div>
          </div>

          <div class="col-12 col-xl-4">
            <div class="card border-0 shadow-sm p-4 bg-white rounded-4 text-center">
              <h5 class="fw-bold mb-4 text-start block-title">Avatar</h5>
              
              <div class="mb-3 d-inline-block position-relative mx-auto">
                <div class="avatar-preview-container rounded-circle p-1 d-flex align-items-center justify-content-center">
                  <img :src="avatarSeleccionado" alt="Avatar actual" class="img-fluid rounded-circle" style="width: 90px; height: 90px; object-fit: cover;"/>
                </div>
              </div>
              
              <p class="text-muted small mb-4">Elige un estilo o súbelo a Firebase Storage (próximamente).</p>

              <div class="row g-2 mb-4">
                <div v-for="avatar in avatars" :key="avatar.id" class="col-3">
                  <button 
                    @click="seleccionarAvatar(avatar.url)"
                    type="button" 
                    class="btn p-1 avatar-option-btn w-100 h-100 rounded-3 border-0"
                    :class="{ 'active-avatar': avatarSeleccionado === avatar.url }"
                  >
                    <img :src="avatar.url" class="img-fluid rounded-3" alt="Opción"/>
                  </button>
                </div>
              </div>

              <button @click="guardarDatos" type="button" class="btn btn-outline-light-custom w-100 py-2 rounded-3 text-secondary-custom small fw-semibold">
                <i class="bi bi-upload me-2"></i>Guardar avatar
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer class="footer-dashboard bg-white border-top py-3 px-5 text-muted small">
        <div class="d-flex justify-content-between align-items-center">
          <span>&copy; 2026 OtakuHub &mdash; Panel privado.</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-dashboard {
  min-height: 100vh;
  background-color: #f8fafc;
}

.main-wrapper {
  min-height: 100vh;
}

.navbar-top {
  height: 60px;
  min-height: 60px;
}

.text-secondary-custom {
  color: #334155;
  font-weight: 500;
  font-size: 15px;
}

.btn-back {
  font-size: 14px;
  transition: color 0.2s ease;
  &:hover {
    color: #1e293b !important;
  }
}

.dashboard-content {
  background-color: #f8fafc;
}

.text-dark-custom {
  color: #0f172a;
}

.block-title {
  color: #1e293b;
}

.custom-input {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px !important;
  color: #334155;
  font-size: 14px;
  &:focus {
    border-color: #9d4edd;
    box-shadow: 0 0 0 3px rgba(157, 78, 221, 0.15);
  }
}

.btn-purple {
  background-color: #9d4edd;
  color: #ffffff;
  border: none;
  font-size: 14px;
  &:hover {
    background-color: #7b2cbf;
    color: #ffffff;
  }
}

.btn-outline-light-custom {
  border: 1px solid #e2e8f0;
  background-color: transparent;
  transition: background-color 0.2s ease;
  font-size: 14px;
  &:hover {
    background-color: #f8fafc;
  }
}

.avatar-preview-container {
  width: 105px;
  height: 105px;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
}

.avatar-option-btn {
  background-color: #f8fafc;
  border: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(1.05);
  }
}

.active-avatar {
  outline: 2px solid #9d4edd;
  background-color: #f3e8ff;
}

.footer-dashboard {
  font-size: 13px;
  color: #64748b;
}
</style>