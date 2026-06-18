const API_URL = "https://api.jikan.moe/v4"

export const animeService = {
    async getAnimes() {
        const response = await fetch(`${API_URL}/anime`)
        const data = await response.json()
        return data.data
    },

    async getAnimeById(id) {
    const response = await fetch(`${API_URL}/anime/${id}`)
    const data = await response.json()
    return data.data
    }
}

