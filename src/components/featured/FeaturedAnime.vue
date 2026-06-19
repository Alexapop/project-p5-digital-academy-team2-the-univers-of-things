<script setup>
import { onMounted } from 'vue'
import { useAnimeStore } from '@/stores/animeStore'
import { useAdminStore } from '@/stores/admin'
import AnimeCard from '@/components/card/AnimeCard.vue'

const animeStore = useAnimeStore()
const adminStore = useAdminStore()

onMounted(() => {
  if (animeStore.animes.length === 0) {
    animeStore.fetchAnimes()
  }
})   
</script>

<template>
  <div class="featured-wrapper">
    
    <div v-if="adminStore.featuredAnimes && adminStore.featuredAnimes.length > 0" class="featured">
      <div class="featured__title text-center mb-4">
        <h1>Featured Anime</h1>
      </div>
      <div class="d-flex flex-wrap justify-content-center px-4 px-md-5" style="gap: 0.5rem;">
        <div v-for="anime in adminStore.featuredAnimes" :key="anime.mal_id" style="width: 18rem;">
          <AnimeCard :anime="anime" />
        </div>
      </div>
    </div>

    <div v-else-if="animeStore.loading" class="text-center text-muted py-5">
      Cargando destacados...
    </div>

    <div v-else class="text-center text-muted py-5">
      No hay ningún anime destacado seleccionado en el panel de administración.
    </div>

  </div>
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