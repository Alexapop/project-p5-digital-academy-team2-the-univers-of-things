<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import DashboardSidebar from '@/components/common/DashboardSidebar.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// --- Datos del usuario para la sidebar ---
const name = ref(authStore.currentUser?.name || 'Sora Tanaka')
const email = ref(authStore.currentUser?.email || '')
const avatarSeleccionado = ref(authStore.currentUser?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=green')
const userFallback = computed(() => {
  if (!name.value) return 'ST'
  return name.value.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
})

// Control de visibilidad del formulario
const showForm = ref(false)

// Variable para el formulario de nuevo elemento
const newFavorite = reactive({
  title: '',
  content: '',
  rating: 0
})

// Referencia para hacer foco al título al editar
const editTitleInput = ref(null)

// --- Funcionalidad CRUD y Valoración ---

// Mostrar/ocultar formulario
const toggleForm = () => {
  showForm.value = !showForm.value
  if (!showForm.value) {
    // Limpiar formulario al cerrar
    newFavorite.title = ''
    newFavorite.content = ''
    newFavorite.rating = 0
  }
}

// Cancelar y cerrar formulario
const cancelForm = () => {
  newFavorite.title = ''
  newFavorite.content = ''
  newFavorite.rating = 0
  showForm.value = false
}

// Añadir un nuevo favorito manualmente
const addFavorite = () => {
  if (!newFavorite.title.trim() || !newFavorite.content.trim()) {
    alert('El título y el contenido son obligatorios.')
    return
  }

  authStore.addFavorite({
    mal_id: Date.now(), // ID único para favoritos manuales
    title: newFavorite.title.trim(),
    synopsis: newFavorite.content.trim(),
    rating: newFavorite.rating
  })

  // Limpiar formulario y ocultarlo
  newFavorite.title = ''
  newFavorite.content = ''
  newFavorite.rating = 0
  showForm.value = false
}

// Eliminar un favorito
const deleteFavorite = (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar este favorito?')) {
    authStore.removeFavorite(id)
  }
}

// Activar el modo edición
const startEditing = (favorite) => {
  // Cerrar cualquier otra edición abierta
  authStore.favorites.forEach(f => f.editing = false)
  // Activar edición en el elemento actual
  favorite.editing = true
  // Enfocar el campo de título tras el renderizado
  nextTick(() => {
    if (editTitleInput.value) {
      editTitleInput.value.focus()
    }
  })
}

// Guardar cambios de edición
const saveEdit = (favorite) => {
  if (!favorite.title.trim() || !favorite.content.trim()) {
    alert('El título y el contenido no pueden estar vacíos.')
    return
  }
  
  authStore.updateFavorite(favorite.id, {
    title: favorite.title.trim(),
    content: favorite.content.trim(),
    rating: favorite.rating,
    editing: false
  })
}

// Cancelar edición
const cancelEdit = (favorite) => {
  favorite.editing = false
}

// Establecer o cambiar valoración (rating con estrellas)
const setRating = (favorite, newRating) => {
  authStore.updateFavorite(favorite.id, {
    rating: newRating
  })
}
</script>

<template>
  <div class="user-dashboard d-flex">
    <!-- Sidebar común -->
    <DashboardSidebar 
      title="DASHBOARD"
      :links="[
        { to: '/dashboard/favoritos', label: 'Favoritos', icon: 'bi-heart' },
        { to: '/dashboard/perfil', label: 'Perfil', icon: 'bi-person-fill' }
      ]"
      :userData="{ name, email, fallback: userFallback, avatar: avatarSeleccionado }"
    />

    <div class="main-wrapper d-flex flex-column flex-grow-1">
      <header class="navbar-top bg-white border-bottom px-4 d-flex justify-content-between align-items-center">
        <span class="fw-bold text-secondary-custom">Mi Dashboard</span>
        <router-link to="/" class="btn-back text-decoration-none small text-secondary">
          ← Volver al sitio
        </router-link>
      </header>

      <main class="dashboard-content flex-grow-1 p-4 p-md-5">
        <!-- Cabecera con botón Añadir -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 class="fw-bold h2 m-0 text-dark-custom">Mis Favoritos</h1>
            <p class="text-muted m-0">Edita, valora o elimina favoritos de tu colección.</p>
          </div>
          <button 
            @click="toggleForm" 
            class="btn btn-add px-4 py-2 fw-semibold rounded-3"
          >
            <i class="bi bi-plus-lg me-2"></i>Añadir
          </button>
        </div>

        <!-- Formulario desplegable para añadir -->
        <transition name="slide-fade">
          <div v-if="showForm" class="card border-0 shadow-sm p-4 bg-white rounded-4 mb-4">
            <h5 class="fw-bold mb-4 block-title">Nuevo favorito</h5>
            <form @submit.prevent="addFavorite">
              <div class="row g-3 align-items-end">
                <div class="col-12 col-md-5">
                  <label class="form-label text-muted small fw-semibold">Título</label>
                  <input 
                    v-model="newFavorite.title" 
                    type="text" 
                    class="form-control custom-input py-2.5 px-3" 
                    placeholder="Ej: Attack on Titan" 
                    required 
                  />
                </div>
                <div class="col-12 col-md-5">
                  <label class="form-label text-muted small fw-semibold">Contenido / Descripción</label>
                  <input 
                    v-model="newFavorite.content" 
                    type="text" 
                    class="form-control custom-input py-2.5 px-3" 
                    placeholder="¿Por qué te gusta?" 
                    required 
                  />
                </div>
                <div class="col-6 col-md-2">
                  <label class="form-label text-muted small fw-semibold">Valoración</label>
                  <div class="rating-input d-flex align-items-center gap-1">
                    <button
                      v-for="star in 5"
                      :key="star"
                      type="button"
                      class="star-btn btn p-0 border-0 bg-transparent fs-5"
                      :class="star <= newFavorite.rating ? 'text-warning' : 'text-muted'"
                      @click="newFavorite.rating = star"
                    >
                      <i class="bi" :class="star <= newFavorite.rating ? 'bi-star-fill' : 'bi-star'"></i>
                    </button>
                  </div>
                </div>
                <div class="col-12 d-flex justify-content-end gap-2 mt-3">
                  <button 
                    @click="cancelForm" 
                    type="button" 
                    class="btn btn-outline-secondary px-4 py-2 fw-semibold rounded-3"
                  >
                    Cancelar
                  </button>
                  <button type="submit" class="btn btn-add px-4 py-2 fw-semibold rounded-3">
                    <i class="bi bi-check-lg me-2"></i>Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </transition>

        <!-- Estado vacío: recuadro blanco que ocupa todo el ancho -->
        <div v-if="authStore.favorites.length === 0 && !showForm" class="empty-state-card bg-white rounded-4 shadow-sm p-5 text-center w-100">
          <h5 class="text-muted fw-normal">No tienes favoritos todavía.</h5>
        </div>

        <!-- Lista de favoritos existentes -->
        <div v-if="authStore.favorites.length > 0" class="row g-4">
          <div v-for="fav in authStore.favorites" :key="fav.id" class="col-12 col-lg-6">
            <div class="card border-0 shadow-sm p-4 bg-white rounded-4 h-100">
              <template v-if="fav.editing">
                <!-- MODO EDICIÓN -->
                <div class="d-flex flex-column h-100">
                  <input
                    ref="editTitleInput"
                    v-model="fav.title"
                    type="text"
                    class="form-control custom-input mb-2 fw-bold"
                    required
                  />
                  <textarea
                    v-model="fav.content"
                    class="form-control custom-input mb-3 flex-grow-1"
                    rows="2"
                    required
                  ></textarea>
                  <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div class="rating-input d-flex align-items-center gap-1">
                      <button
                        v-for="star in 5"
                        :key="star"
                        type="button"
                        class="star-btn btn p-0 border-0 bg-transparent fs-5"
                        :class="star <= fav.rating ? 'text-warning' : 'text-muted'"
                        @click="setRating(fav, star)"
                      >
                        <i class="bi" :class="star <= fav.rating ? 'bi-star-fill' : 'bi-star'"></i>
                      </button>
                    </div>
                    <div class="d-flex gap-2">
                      <button @click="cancelEdit(fav)" class="btn btn-outline-secondary btn-sm rounded-3">
                        Cancelar
                      </button>
                      <button @click="saveEdit(fav)" class="btn btn-add btn-sm rounded-3">
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <!-- MODO LECTURA -->
                <div class="d-flex flex-column h-100">
                  <h5 class="fw-bold text-dark-custom mb-2">{{ fav.title }}</h5>
                  <p class="text-muted small flex-grow-1">{{ fav.content }}</p>
                  <div class="d-flex justify-content-between align-items-center mt-3">
                    <!-- Estrellas interactivas -->
                    <div class="d-flex align-items-center gap-1">
                      <i
                        v-for="star in 5"
                        :key="star"
                        class="bi fs-5 cursor-pointer"
                        :class="star <= fav.rating ? 'bi-star-fill text-warning' : 'bi-star text-muted'"
                        @click="setRating(fav, star)"
                        role="button"
                        :title="`Valorar con ${star} estrellas`"
                      ></i>
                      <span class="ms-2 small text-muted">{{ fav.rating }}/5</span>
                    </div>
                    <!-- Botones de acción -->
                    <div class="d-flex gap-2">
                      <button @click="startEditing(fav)" class="btn btn-outline-light-custom btn-sm rounded-3 p-2" title="Editar">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button @click="deleteFavorite(fav.id)" class="btn btn-outline-danger btn-sm rounded-3 p-2" title="Eliminar">
                        <i class="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </template>
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

/* Nuevo estilo para botones con gradiente */
.btn-add {
  background: linear-gradient(135deg, #7c4dff, #b766f2);
  color: #ffffff;
  border: none;
  font-size: 14px;
  &:hover {
    filter: brightness(125%);
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

.footer-dashboard {
  font-size: 13px;
  color: #64748b;
}

/* Estilos para las estrellas */
.star-btn {
  transition: transform 0.15s ease;
  line-height: 1;
  &:hover {
    transform: scale(1.2);
  }
}

textarea.custom-input {
  resize: vertical;
  min-height: 60px;
}

.cursor-pointer {
  cursor: pointer;
}

/* Estilo para el estado vacío - ahora ocupa todo el ancho */
.empty-state-card {
  width: 100%;
  border: 1px solid #f1f5f9;
}

/* Animación para el formulario */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.25s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>