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
    <body>
        <div v-if="animeStore.loading">
        Cargando animes...
    </div>

    <div v-else-if="animeStore.error">{{ animeStore.error }}</div>

    <div v-else class="featured">
    <div class="featured__title text-center mb-4">
        <h1>Featured Anime</h1>
    </div>
    <div class="d-flex flex-wrap justify-content-center px-4 px-md-5" style="gap: 0.5rem;">
        <div v-for="anime in topAnimes" :key="anime.mal_id" style="width: 18rem;">
            <AnimeCard :anime="anime" />
        </div>
    </div>
</div>
    </body>
</template>

<style lang="scss" scoped>
.featured {
  margin-top: 60px;
  margin-bottom: 48px;

  &__title {
    h1 {
      margin: 0;
      font-size: 36px;
      font-weight: 700;
      line-height: 1.1;
      color: #020617;
    }
  }
}

@media (max-width: 767.98px) {
  .featured {
    margin-top: 40px;

    &__title {
      h1 {
        font-size: 30px;
      }
    }
  }
}
</style>