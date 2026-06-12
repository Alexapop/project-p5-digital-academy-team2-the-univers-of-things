<script setup>
import { ref } from 'vue'

const paginaActual = ref(1)
const totalPaginas = 5 

function avanzarPagina() {
  if (paginaActual.value < totalPaginas) paginaActual.value++
}

function retrocederPagina() {
  if (paginaActual.value > 1) paginaActual.value--
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center gap-2 my-4">
    
    <button @click="retrocederPagina" class="btn btn-light fw-bold" :disabled="paginaActual === 1">
      &lt;
    </button>

    <button 
      v-for="num in totalPaginas" 
      :key="num"
      @click="paginaActual = num"
      class="btn fw-bold mx-1"
      :class="paginaActual === num ? 'btn-morado-gradient' : 'btn-light'"
    >
      {{ num }}
    </button>

    <button @click="avanzarPagina" class="btn btn-light fw-bold" :disabled="paginaActual === totalPaginas">
      &gt;
    </button>

  </div>
</template>

<style scoped>
.btn-morado-gradient {
  background: linear-gradient(135deg, #7c4dff, #b766f2) !important;
  color: white !important;
  border: none !important; 
}
</style>