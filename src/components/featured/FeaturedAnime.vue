<script setup>
import { onMounted } from 'vue'
import { useAnimeStore } from '@/stores/animeStore'
import AnimeCard from '@/components/card/AnimeCard.vue'

const animeStore = useAnimeStore()
onMounted(() => {
    animeStore.fetchAnimes()
})    
</script>

<template>
    <div v-if="animeStore.loading">
        Cargando animes...
    </div>

    <div v-else-if="animeStore.error">{{ animeStore.error }}</div>

    <div v-else class="d-flex flex-wrap justify-content-center px-4 px-md-5" style="gap: 0.5rem;">
        <div v-for="anime in animeStore.animes" :key="anime.mal_id" style="width: 18rem;">
            <AnimeCard :anime="anime" />
        </div>
    </div>
</template>
