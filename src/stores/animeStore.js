import { defineStore } from 'pinia'
import { animeService } from '@/services/animeService'

export const useAnimeStore = defineStore('anime', {
    state: () => ({
        animes: [],
        loading: false,
        error: null
    }),
  
    actions: {
        async fetchAnimes() {
            this.loading = true
            this.error = null
      
            try {
                this.animes = await animeService.getAnimes()
            } catch (error) {
                this.error = 'Error al cargar los animes'
                console.error(error)
            } finally {
                this.loading = false
            }
        }
    }
})