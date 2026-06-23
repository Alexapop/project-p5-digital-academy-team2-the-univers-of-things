import { defineStore } from 'pinia'
import { animeService } from '@/services/animeService'

// 1. Datos estáticos por defecto (para que el Home NUNCA salga vacío si no hay cambios)
const DESTACADOS_POR_DEFECTO = [
    { id: 101, title: 'Attack on Titan', mal_id: 16498, image_url: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg', score: 8.5 },
    { id: 102, title: 'Demon Slayer', mal_id: 38000, image_url: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg', score: 8.4 },
    { id: 103, title: 'Jujutsu Kaisen', mal_id: 40748, image_url: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg', score: 8.7 }
]

const ANIME_SEMANA_POR_DEFECTO = {
    id: 104,
    title: 'One Piece',
    mal_id: 21,
    image_url: 'https://cdn.myanimelist.net/images/anime/6/73244.jpg',
    synopsis: '¡El anime legendario seleccionado de forma fija por el staff de OtakuHub!'
}

export const useAnimeStore = defineStore('anime', {
    state: () => ({
        animes: [],
        loading: false,
        error: null,
        currentPage: 1,
        perPage: 8,

        // 2. Cargamos de localStorage si existe, si no, metemos los datos por defecto
        featuredAnimes: JSON.parse(localStorage.getItem('otakuhub_featured')) || DESTACADOS_POR_DEFECTO,
        animeOfTheWeek: JSON.parse(localStorage.getItem('otakuhub_week')) || ANIME_SEMANA_POR_DEFECTO
    }),
  
    getters: {
        // Aseguramos que lea la longitud sobre un array real usando "|| []"
        totalPages: (state) => Math.ceil((state.animes || []).length / state.perPage),
        
        // PARCHE DE SEGURIDAD ABSOLUTO: Si la API se cae o da error 429, no rompe el .slice
        paginatedAnimes: (state) => {
            const listaSegura = state.animes || []
            const start = (state.currentPage - 1) * state.perPage
            const end = start + state.perPage
            return listaSegura.slice(start, end)
        }
    },
  
    actions: {
        async fetchAnimes() {
            this.loading = true
            this.error = null
      
            try {
                const response = await animeService.getAnimes()
                // Validamos que si el servicio falla o no devuelve nada, ponga un array vacío en vez de romper la app
                this.animes = response || []
            } catch (error) {
                this.error = 'Error al cargar los animes'
                this.animes = [] // Forzamos array vacío para que los componentes sigan funcionando
                console.error(error)
            } finally {
                this.loading = false
            }
        },
        
        goToPage(page) {
            this.currentPage = page
        },

        // 3. Guarda los destacados permanentemente en el navegador
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