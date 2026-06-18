<script setup>
import { useAnimeStore } from '@/stores/animeStore'

const animeStore = useAnimeStore()
</script>

<template>
  <div class="d-flex justify-content-center align-items-center gap-2 my-4">
    
    <button @click="animeStore.goToPage(animeStore.currentPage - 1)" 
            class="btn btn-light fw-bold" 
            :disabled="animeStore.currentPage === 1">
      &lt;
    </button>

    <button 
      v-for="num in animeStore.totalPages" 
      :key="num"
      @click="animeStore.goToPage(num)"
      class="btn fw-bold mx-1"
      :class="animeStore.currentPage === num ? 'btn-morado-gradient' : 'btn-light'"
    >
      {{ num }}
    </button>

    <button @click="animeStore.goToPage(animeStore.currentPage + 1)" 
            class="btn btn-light fw-bold" 
            :disabled="animeStore.currentPage === animeStore.totalPages">
      &gt;
    </button>

  </div>
</template>