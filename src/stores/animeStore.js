import { defineStore } from 'pinia'

export const useAnimeStore = defineStore('anime', {
    state: () => ({
        animes: [],
        loading: false,
        error: null,
        currentPage: 1,
        perPage: 25,
        totalItems: 0,
        totalPagesFromApi: 1,

        featuredAnimes: JSON.parse(localStorage.getItem('otakuhub_featured')) || [],
        animeOfTheWeek: JSON.parse(localStorage.getItem('otakuhub_week')) || null
    }),
  
    getters: {
        // Aseguramos que lea la longitud sobre un array real usando "|| []"
        totalPages: (state) => Math.ceil((state.animes || []).length / state.perPage),
        totalPages: (state) => {
            return Math.max(1, Math.min(state.totalPagesFromApi || 1, 25))
        },
        
        // PARCHE DE SEGURIDAD ABSOLUTO: Si la API se cae o da error 429, no rompe el .slice
        paginatedAnimes: (state) => {
            const listaSegura = state.animes || []
            const start = (state.currentPage - 1) * state.perPage
            const end = start + state.perPage
            return listaSegura.slice(start, end)
            return state.animes
        }
    },
  
    actions: {
        async fetchAnimes(page = 1) {
            this.loading = true
            this.error = null
      
            try {
                const response = await fetch(`https://api.jikan.moe/v4/anime?page=${page}&min_score=8.2`)
                
                if (response.status === 429) {
                    await new Promise(resolve => setTimeout(resolve, 1000))
                    return await this.fetchAnimes(page)
                }

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const fetchedData = await response.json()

                if (fetchedData && fetchedData.data) {
                    this.animes = fetchedData.data
                    this.currentPage = page
                    this.totalItems = fetchedData.data.length
                    
                    if (fetchedData.pagination && fetchedData.pagination.last_visible_page) {
                        this.totalPagesFromApi = fetchedData.pagination.last_visible_page
                    }
                }
            } catch (error) {
                this.error = 'Error al cargar los animes'
                this.animes = [] // Forzamos array vacío para que los componentes sigan funcionando
                console.error(error)
            } finally {
                this.loading = false
            }
        },
        
        goToPage(page) {
            if (page < 1 || page > this.totalPages) return
            this.fetchAnimes(page)
        },

        updateAdminSelections(nuevosDestacados, nuevoAnimeSemana) {
            if (nuevosDestacados) {
                this.featuredAnimes = nuevosDestacados
                localStorage.setItem('otakuhub_featured', JSON.stringify(nuevosDestacados))
            }
            if (nuevoAnimeSemana) {
                this.animeOfTheWeek = nuevoAnimeSemana
                localStorage.setItem('otakuhub_week', JSON.stringify(nuevoAnimeSemana))
            }
            alert('¡Selecciones del Admin guardadas con éxito en el navegador!')
        }
    }
})