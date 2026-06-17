<script setup>
import { ref } from 'vue'

// Estado para los destacados de la Home (Mock data inicial basado en tu captura)
const featuredIds = ref([
  { id: '52991', label: 'MAL ID: 52991' },
  { id: '21', label: 'MAL ID: 21' },
  { id: '11061', label: 'MAL ID: 11061' },
  { id: '5114', label: 'MAL ID: 5114' }
])

const newFeaturedId = ref('')

// Estado para el Anime de la semana
const weeklyId = ref('52991')
const newWeeklyId = ref('')

// Funciones para simular la interactividad
const addFeatured = () => {
  if (newFeaturedId.value.trim() && featuredIds.value.length < 4) {
    featuredIds.value.unshift({
      id: newFeaturedId.value,
      label: `MAL ID: ${newFeaturedId.value}`
    })
    newFeaturedId.value = ''
  }
}

const removeFeatured = (index) => {
  featuredIds.value.splice(index, 1)
}

const saveWeekly = () => {
  if (newWeeklyId.value.trim()) {
    weeklyId.value = newWeeklyId.value
    newWeeklyId.value = ''
  }
}
</script>

<template>
  <div class="d-flex flex-column gap-5">
    
    <div class="card border rounded-4 shadow-sm p-4 bg-white">
      <h2 class="fw-bold h4 mb-1 text-dark">Destacados de la Home</h2>
      <p class="text-muted small mb-4">Añade el MAL ID de los animes a destacar (máx. 4).</p>
      
      <div class="input-group mb-3 custom-input-group">
        <input 
          type="text" 
          class="form-control py-2.5 px-3" 
          placeholder="MAL ID (ej. 21)" 
          v-model="newFeaturedId"
          :disabled="featuredIds.length >= 4"
        >
        <button class="btn btn-purple px-4" type="button" @click="addFeatured" :disabled="featuredIds.length >= 4">
          Añadir
        </button>
      </div>

      <div class="d-flex flex-column gap-2">
        <div 
          v-for="(item, index) in featuredIds" 
          :key="index" 
          class="d-flex justify-content-between align-items-center border rounded-3 p-2.5 px-3 bg-light-subtle"
        >
          <span class="text-secondary small fw-medium">{{ item.label }}</span>
          <button class="btn p-0 border-0 text-secondary hover-dark" @click="removeFeatured(index)">
            <i class="bi bi-x-lg fs-6"></i>
          </button>
        </div>
      </div>
      
      <small class="text-muted mt-3 d-block ts-xs">
        Ejemplos: 21 (One Piece) • 5114 (FMA: Brotherhood) • 11061 (HxH 2011) • 52991 (Frieren)
      </small>
    </div>

    <div class="card border rounded-4 shadow-sm p-4 bg-white">
      <h2 class="fw-bold h4 mb-1 text-dark">Anime de la semana</h2>
      <p class="text-muted small mb-4">Define el MAL ID que aparecerá en la barra lateral del Home.</p>
      
      <div class="input-group mb-3 custom-input-group">
        <input 
          type="text" 
          class="form-control py-2.5 px-3" 
          placeholder="MAL ID semanal (ej. 52991)" 
          v-model="newWeeklyId"
        >
        <button class="btn btn-purple px-4" type="button" @click="saveWeekly">
          Guardar
        </button>
      </div>

      <div class="d-flex justify-content-between align-items-center border rounded-3 p-2.5 px-3 bg-light-subtle">
        <span class="text-secondary small fw-medium">Actual: MAL ID {{ weeklyId }}</span>
        <button class="btn p-0 border-0 text-secondary hover-dark" @click="weeklyId = ''">
          <i class="bi bi-x-lg fs-6"></i>
        </button>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.btn-purple {
  background-color: #7c4dff;
  color: white;
  font-weight: 600;
  
  &:hover {
    background-color: #635bff;
    color: white;
  }
  
  &:disabled {
    background-color: #cbd5e1;
    border-color: #cbd5e1;
  }
}

.custom-input-group {
  input {
    border-color: #e2e8f0;
    &:focus {
      border-color: #a78bfa;
      box-shadow: 0 0 0 0.25rem rgba(124, 77, 255, 0.1);
    }
  }
}

.bg-light-subtle {
  background-color: #f8fafc;
  border-color: #e2e8f0 !important;
}

.hover-dark:hover {
  color: #1e293b !important;
}

.ts-xs {
  font-size: 0.75rem;
}
</style>