<script setup>
import { ref } from 'vue'
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()

// Inputs independientes para cada sección
const animeIdInput = ref('')
const animeSemanalInput = ref('')

// 1. Función para la primera sección (Destacados de la Home)
const handleAddFeatured = async () => {
  if (!animeIdInput.value) return
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeIdInput.value}`)
    if (!response.ok) {
      alert('No se encontró ningún anime con ese ID')
      return
    }
    const json = await response.json()
    const animeData = json.data

    const nuevoAnime = {
      mal_id: animeData.mal_id,
      id: animeData.mal_id, 
      title: animeData.title,
      score: animeData.score || 'N/A',
      synopsis: animeData.synopsis || 'Sin sinopsis disponible.',
      genres: animeData.genres || [],
      images: { jpg: { image_url: animeData.images?.jpg?.image_url } }
    }

    adminStore.addFeaturedAnime(nuevoAnime)
    animeIdInput.value = ''
  } catch (error) {
    console.error(error)
  }
}

// 2. Función para la segunda sección (Anime de la semana)
const handleSetWeekly = async () => {
  if (!animeSemanalInput.value) return
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeSemanalInput.value}`)
    if (!response.ok) {
      alert('No se encontró ningún anime con ese ID')
      return
    }
    const json = await response.json()
    const animeData = json.data

    const nuevoAnimeSemanal = {
      mal_id: animeData.mal_id,
      id: animeData.mal_id, 
      title: animeData.title,
      score: animeData.score || 'N/A',
      synopsis: animeData.synopsis || 'Sin sinopsis disponible.',
      genres: animeData.genres || [],
      images: { jpg: { image_url: animeData.images?.jpg?.image_url } }
    }

    // 🔥 CAMBIO AQUÍ: Usamos la función persistente del store
    adminStore.setWeeklyAnime(nuevoAnimeSemanal)
    animeSemanalInput.value = ''
  } catch (error) {
    console.error(error)
  }
}

// Función para quitar el anime de la semana
const handleRemoveWeekly = () => {
  // 🔥 CAMBIO AQUÍ: Usamos la función pasando null para limpiar el localStorage
  adminStore.setWeeklyAnime(null)
}
</script>

<template>
  <div class="d-flex flex-column gap-4">
    
    <div class="card p-4 shadow-sm bg-white rounded">
      <h3 class="fs-4 fw-bold text-dark mb-1">Destacados de la Home</h3>
      <p class="text-muted small mb-4">Añade el MAL ID de los animes a destacar (máx. 4).</p>

      <div class="input-group mb-4">
        <input v-model="animeIdInput" type="text" class="form-control" placeholder="MAL ID (ej. 21)" @keyup.enter="handleAddFeatured" />
        <button @click="handleAddFeatured" class="btn text-white fw-semibold px-4" style="background-color: #7c3aed;">Añadir</button>
      </div>

      <div v-if="adminStore.featuredAnimes && adminStore.featuredAnimes.length > 0" class="d-flex flex-column gap-2">
        <div v-for="anime in adminStore.featuredAnimes" :key="anime.mal_id" class="d-flex justify-content-between align-items-center border rounded p-3 bg-white">
          <div class="d-flex align-items-center gap-3">
            <img v-if="anime.images?.jpg?.image_url" :src="anime.images.jpg.image_url" class="rounded object-fit-cover" style="width: 40px; height: 55px;" />
            <div>
              <span class="text-muted fw-semibold small me-2">MAL ID: {{ anime.mal_id }}</span>
              <span class="text-dark fw-bold">— {{ anime.title }}</span>
            </div>
          </div>
          <button @click="adminStore.removeFeaturedAnime(anime.mal_id)" class="btn btn-link text-secondary text-decoration-none fw-bold">X</button>
        </div>
      </div>
      <p v-else class="text-muted small italic m-0">No hay ningún anime destacado seleccionado todavía.</p>
      
      <div class="mt-4 pt-2 border-top text-muted small">
        <span class="fw-semibold">Ejemplos válidos:</span> 21 (One Piece) • 5114 (FMA) • 11061 (HxH)
      </div>
    </div>

    <div class="card p-4 shadow-sm bg-white rounded">
      <h3 class="fs-4 fw-bold text-dark mb-1">Anime de la semana</h3>
      <p class="text-muted small mb-4">Define el MAL ID que aparecerá en la barra lateral del Home.</p>

      <div class="input-group mb-4">
        <input v-model="animeSemanalInput" type="text" class="form-control" placeholder="MAL ID semanal (ej. 52991)" @keyup.enter="handleSetWeekly" />
        <button @click="handleSetWeekly" class="btn text-white fw-semibold px-4" style="background-color: #7c3aed;">Guardar</button>
      </div>

      <div v-if="adminStore.weeklyAnime" class="d-flex justify-content-between align-items-center border rounded p-3 bg-white">
        <div class="d-flex align-items-center gap-3">
          <img :src="adminStore.weeklyAnime.images?.jpg?.image_url" class="rounded object-fit-cover" style="width: 40px; height: 55px;" />
          <div>
            <span class="text-muted fw-semibold small me-2">Actual: MAL ID {{ adminStore.weeklyAnime.mal_id }}</span>
            <span class="text-dark fw-bold">— {{ adminStore.weeklyAnime.title }}</span>
          </div>
        </div>
        <button @click="handleRemoveWeekly" class="btn btn-link text-secondary text-decoration-none fw-bold">X</button>
      </div>
      <p v-else class="text-muted small italic m-0">No se ha asignado el anime de la semana todavía.</p>
    </div>

  </div>
</template>

<style scoped>
.object-fit-cover {
  object-fit: cover;
}
</style>