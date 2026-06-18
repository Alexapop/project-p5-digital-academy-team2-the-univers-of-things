import { defineStore } from 'pinia'
import { animeService } from '@/services/animeService'

export const useAnimeStore = defineStore('anime', {
    state: () => ({
        animes: [],
        loading: false,
        error: null,
        currentPage: 1,
        perPage: 8
    }),
  
    getters: {
        totalPages: (state) => Math.ceil(state.animes.length / state.perPage),
        
        paginatedAnimes: (state) => {
            const start = (state.currentPage - 1) * state.perPage
            const end = start + state.perPage
            return state.animes.slice(start, end)
        }
    },
  
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
        },
        
        goToPage(page) {
            this.currentPage = page
        }
    }
})