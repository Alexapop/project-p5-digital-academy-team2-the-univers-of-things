<script setup>
import { computed } from 'vue'
import { useAnimeStore } from '@/stores/animeStore'

const animeStore = useAnimeStore()

// Calcular qué páginas mostrar (máximo 5)
const visiblePages = computed(() => {
  const current = animeStore.currentPage
  const total = animeStore.totalPages
  const maxVisible = 5
  
  let start = Math.max(1, current - Math.floor(maxVisible / 2))
  let end = Math.min(total, start + maxVisible - 1)
  
  // Ajustar si estamos cerca del final
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Verificar si mostramos los puntos suspensivos
const showFirstDots = computed(() => {
  return visiblePages.value[0] > 1
})

const showLastDots = computed(() => {
  return visiblePages.value[visiblePages.value.length - 1] < animeStore.totalPages
})
</script>

<template>
  <div class="pagination-container">
    <div class="d-flex justify-content-center align-items-center gap-2 my-4">
      
      <!-- Botón Anterior -->
      <button 
        @click="animeStore.goToPage(animeStore.currentPage - 1)" 
        class="btn btn-light fw-bold pagination-btn" 
        :disabled="animeStore.currentPage === 1"
      >
        <i class="bi bi-chevron-left"></i>
      </button>

      <!-- Primera página y puntos suspensivos -->
      <template v-if="showFirstDots">
        <button 
          @click="animeStore.goToPage(1)"
          class="btn btn-light fw-bold pagination-btn"
        >
          1
        </button>
        <span class="pagination-dots">...</span>
      </template>

      <!-- Páginas visibles -->
      <button 
        v-for="num in visiblePages" 
        :key="num"
        @click="animeStore.goToPage(num)"
        class="btn fw-bold pagination-btn"
        :class="animeStore.currentPage === num ? 'btn-morado-gradient' : 'btn-light'"
      >
        {{ num }}
      </button>

      <!-- Última página y puntos suspensivos -->
      <template v-if="showLastDots">
        <span class="pagination-dots">...</span>
        <button 
          @click="animeStore.goToPage(animeStore.totalPages)"
          class="btn btn-light fw-bold pagination-btn"
        >
          {{ animeStore.totalPages }}
        </button>
      </template>

      <!-- Botón Siguiente -->
      <button 
        @click="animeStore.goToPage(animeStore.currentPage + 1)" 
        class="btn btn-light fw-bold pagination-btn" 
        :disabled="animeStore.currentPage === animeStore.totalPages"
      >
        <i class="bi bi-chevron-right"></i>
      </button>

    </div>

    <!-- Información de página actual -->
    <div class="text-center text-muted small">
      Página {{ animeStore.currentPage }} de {{ animeStore.totalPages }}
    </div>
  </div>
</template>

<style scoped>
.pagination-container {
  margin: 2rem 0;
}

.pagination-btn {
  min-width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border: 1px solid #dee2e6;
}

.pagination-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-morado-gradient {
  background: linear-gradient(135deg, #7c4dff, #b766f2);
  color: white;
  border: none;
  box-shadow: 0 2px 8px rgba(124, 77, 255, 0.3);
}

.btn-morado-gradient:hover {
  filter: brightness(110%);
}

.btn-light {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  color: #334155;
}

.btn-light:hover:not(:disabled) {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}

.pagination-dots {
  width: 40px;
  text-align: center;
  color: #64748b;
  font-weight: bold;
  letter-spacing: 2px;
  user-select: none;
}
</style>