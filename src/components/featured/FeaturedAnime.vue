<script setup>
import { onMounted } from 'vue'
import { useAnimeStore } from '@/stores/animeStore'
import { useAdminStore } from '@/stores/admin'
import AnimeCard from '@/components/card/AnimeCard.vue'

const animeStore = useAnimeStore()
const adminStore = useAdminStore()

onMounted(() => {
  // Parche anticaídas: Comprobamos de forma segura si la lista existe antes de mirar su length
  if (!animeStore.animes || animeStore.animes.length === 0) {
    animeStore.fetchAnimes()
  }
})   
</script>

<template>
  <div class="featured-wrapper">
    
    <div v-if="adminStore.featuredAnimes?.length > 0" class="featured">
      <div class="featured__title text-center mb-4">
        <h1>Featured Anime</h1>
      </div>
      <div class="featured-grid">
        <AnimeCard 
          v-for="anime in adminStore.featuredAnimes" 
          :key="anime.mal_id"
          :anime="anime" 
        />
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
  padding: 0 1.5rem;

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

// Grid de 4 columnas para featured
.featured-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  max-width: 1400px;
  margin: 0 auto;
}

// Responsive
@media (max-width: 1100px) {
  .featured {
    padding: 0 1rem;
  }
  
  .featured-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .featured {
    margin-top: 40px;
    padding: 0 1rem;

    &__title {
      h1 {
        font-size: 30px;
      }
    }
  }

  .featured-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .featured-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>