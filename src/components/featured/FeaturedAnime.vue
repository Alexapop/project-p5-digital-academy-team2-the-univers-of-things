<script setup>
import { onMounted } from 'vue'
import { useAnimeStore } from '@/stores/animeStore'
import AnimeCard from '@/components/card/AnimeCard.vue'
import { computed } from 'vue'

const animeStore = useAnimeStore()

const topAnimes = computed(() => {
  return [...animeStore.animes]
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
}) 

onMounted(() => {
    animeStore.fetchAnimes()
})   
</script>

<template>
    <div v-if="animeStore.loading">
        Cargando animes...
    </div>

    <div v-else-if="animeStore.error">{{ animeStore.error }}</div>

    <div v-else>
    <h1 class="text-center mb-4">Featured Anime</h1>
    
    <div class="d-flex flex-wrap justify-content-center px-4 px-md-5" style="gap: 0.5rem;">
        <div v-for="anime in topAnimes" :key="anime.mal_id" style="width: 18rem;">
            <AnimeCard :anime="anime" />
        </div>
    </div>
</div>
</template>

<style>
    h1 {
        font-weight: bolder;
    }
</style>