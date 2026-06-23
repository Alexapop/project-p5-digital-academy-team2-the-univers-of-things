<script setup>
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  anime: {
    type: Object,
    required: true
  }
})

const authStore = useAuthStore()

const addToFavorites = () => {
  // Verificar si hay sesión iniciada
  if (!authStore.currentUser) {
    alert('Inicia sesión para añadir favoritos')
    return
  }
  
  const result = authStore.addFavorite(props.anime)
  alert(result.message)
}

// Verificar si el anime ya está en favoritos
const isInFavorites = () => {
  return authStore.isFavorite(props.anime?.mal_id)
}
</script>

<template>
  <button 
    @click="addToFavorites" 
    class="btn btn-secondary"
    :title="isInFavorites() ? 'Ya está en favoritos' : 'Añadir a favoritos'"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="16" 
      :fill="isInFavorites() ? '#ff4757' : 'currentColor'" 
      class="bi bi-heart" 
      viewBox="0 0 16 16"
    >
      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
    </svg>
  </button>
</template>

<style scoped>
.btn-secondary {
    width: 50px;
    height: 50px;
    font-size: 20px;
    background-color: rgb(221, 224, 224);
    border-style: none;
    color: black;
    padding: 10px;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-secondary:hover {
    filter: brightness(105%);
    transform: scale(1.1);
}

.btn-secondary:active {
    transform: scale(0.95);
}
</style>