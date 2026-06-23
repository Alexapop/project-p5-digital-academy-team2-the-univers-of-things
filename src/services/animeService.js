import sleep from '@/stores/utils/sleep'

const API_URL = "https://api.jikan.moe/v4"

export const animeService = {
    async getAnimes(page = 1) {
        try {
            const URI = `${API_URL}/anime?page=${page}&min_score=8.2`
            const response = await fetch(URI)

            // Si hay error "Too Many Requests", esperar y reintentar
            if (response.status === 429) {
                await sleep(1000)
                return await this.getAnimes(page)
            }

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const fetchedData = await response.json()

            if (!('data' in fetchedData)) {
                throw new Error(`Wrong data fetched.\nData: ${JSON.stringify(fetchedData)}`)
            }

            return fetchedData.data
        } catch (error) {
            console.log(`ERROR: ${error.message}`)
            return null
        }
    },

    async getAnimeById(id) {
        try {
            const response = await fetch(`${API_URL}/anime/${id}`)
            
            if (response.status === 429) {
                await sleep(1000)
                return await this.getAnimeById(id)
            }

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json()
            return data.data
        } catch (error) {
            console.log(`ERROR: ${error.message}`)
            return null
        }
    }
}