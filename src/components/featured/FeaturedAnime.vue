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
    <div class="featured__title mb-4 px-4 px-md-5 text-start">
        <p class="destacados-tag"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"/>
        </svg> DESTACADOS POR EL EQUIPO</p>
        <h1>Imprensindibles del momento</h1>
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

body{
    border-top: 1px solid #dde2ea;
}

.featured {
  margin-top: 60px;
  margin-bottom: 48px;

  &__title {
    h1 {
      margin-left: 100px;
      font-size: 36px;
      font-weight: 700;
      line-height: 1.1;
      color: #020617;

    }
  }
}

.destacados-tag {
    color: #8a4fff;
    margin-bottom: 0px;
    margin-left: 100px;
}

@media (max-width: 767.98px) {
  .featured {
    margin-top: 40px;

    &__title {
      h1 {
        margin-left: 0px;
        font-size: 30px;
        text-align: center;
      }
    }
  }

  .destacados-tag {
    margin: 0px;
    text-align: center;
  }
}
</style>