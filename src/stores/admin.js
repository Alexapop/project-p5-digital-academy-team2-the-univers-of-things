import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', () => {
    // Aquí se guardarán los 4 animes destacados que elija el administrador
    const featuredAnimes = ref([])

    // Función para actualizar la lista desde el panel de control
    function updateFeaturedAnimes(animesList) {
        featuredAnimes.value = animesList
    }

    return { featuredAnimes, updateFeaturedAnimes }
})