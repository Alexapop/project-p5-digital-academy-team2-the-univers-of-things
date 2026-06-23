import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', () => {
  // 1. Cargamos los destacados y el semanal desde el disco local (si existen)
  const featuredAnimes = ref(JSON.parse(localStorage.getItem('animes_destacados')) || [])
  const weeklyAnime = ref(JSON.parse(localStorage.getItem('anime_semanal')) || null)

  // Función para añadir destacados (máximo 4) con guardado persistente
  function addFeaturedAnime(anime) {
    const existe = featuredAnimes.value.some(item => item.mal_id === anime.mal_id)
    if (existe) {
      alert('Este anime ya está en los destacados')
      return
    }

    if (featuredAnimes.value.length < 4) {
      featuredAnimes.value.push(anime)
      // Guardamos la lista actualizada en el disco
      localStorage.setItem('animes_destacados', JSON.stringify(featuredAnimes.value))
    } else {
      alert('Máximo 4 animes destacados')
    }
  }

  // Función para quitar de destacados con guardado persistente
  function removeFeaturedAnime(malId) {
    featuredAnimes.value = featuredAnimes.value.filter(anime => anime.mal_id !== malId)
    // Actualizamos el disco duro local
    localStorage.setItem('animes_destacados', JSON.stringify(featuredAnimes.value))
  }

  // Función para guardar o borrar el anime de la semana en el disco
  function setWeeklyAnime(anime) {
    weeklyAnime.value = anime
    if (anime) {
      localStorage.setItem('anime_semanal', JSON.stringify(anime))
    } else {
      localStorage.removeItem('anime_semanal')
    }
  }

  return { 
    featuredAnimes, 
    weeklyAnime, 
    addFeaturedAnime, 
    removeFeaturedAnime,
    setWeeklyAnime
  }
})