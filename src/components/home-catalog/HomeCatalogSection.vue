<script setup>
import { computed, onMounted, ref } from "vue";
import { useAnimeStore } from "@/stores/animeStore";
import { useAdminStore } from "@/stores/admin";
import HomeCatalogSearchInput from "./HomeCatalogSearchInput.vue";
import HomeCatalogGenreFilter from "./HomeCatalogGenreFilter.vue";
import PaginationHub from "../pagination/PaginationHub.vue";
import AnimeCard from "../card/AnimeCard.vue";

const animeStore = useAnimeStore();
const adminStore = useAdminStore();
const searchText = ref("");
const selectedGenre = ref("");

onMounted(() => {
  if (animeStore.animes.length === 0) {
    animeStore.fetchAnimes();
  }
});

const searchError = computed(() => {
  const query = searchText.value.trim();
  if (query === "") return "";
  if (!/^[a-zA-Z\s]+$/.test(query)) {
    return "Por favor, introduce solo letras.";
  }
  return "";
});

const filteredAnimes = computed(() => {
  const query = searchText.value.trim().toLowerCase();

  if (searchError.value !== "") {
    return [];
  }

  if (query === "" && selectedGenre.value === "") {
    return animeStore.paginatedAnimes;
  }

  return animeStore.animes.filter((anime) => {
    const matchesSearch =
      query === "" ||
      anime.title.toLowerCase().includes(query);

    const categories = [
      ...(anime.genres || []),
      ...(anime.explicit_genres || []),
      ...(anime.themes || []),
      ...(anime.demographics || []),
    ];

    const matchesGenre =
      selectedGenre.value === "" ||
      categories.some((category) => category.name === selectedGenre.value);

    return matchesSearch && matchesGenre;
  });
});

</script>

<template>
  <section class="home-catalog">
    
    <header class="home-catalog__header">
      <div class="home-catalog__title">
        <h2>Catálogo General</h2>
        <p>Filtra por género, busca y descubre algo nuevo.</p>
      </div>

      <div class="home-catalog__filters">
        <div class="search-container">
          <HomeCatalogSearchInput v-model="searchText" />
          <p v-if="searchError" class="search-error">
            {{ searchError }}
          </p>
        </div>
        <HomeCatalogGenreFilter v-model="selectedGenre" />
      </div>
    </header>

    <div v-if="animeStore.loading" class="text-center py-5">
      <div class="spinner-border" style="color: #7c4dff;" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3 text-muted">Cargando animes...</p>
    </div>
    
    <div v-else-if="animeStore.error" class="alert alert-danger">
      {{ animeStore.error }}
    </div>

    <div
      v-else-if="
        searchError === '' &&
        (searchText.trim() !== '' || selectedGenre !== '') &&
        filteredAnimes.length === 0
      "
      class="alert alert-info text-center"
    >
      No tenemos anime disponible con estos filtros.
    </div>

    <!-- GRID 5x5 -->
    <div v-else class="catalog-grid">
      <AnimeCard 
        v-for="anime in filteredAnimes" 
        :key="anime.mal_id"
        :anime="anime" 
      />
    </div>

    <PaginationHub
      v-if="searchText.trim() === '' && selectedGenre === ''"
    />
  </section>
</template>

<style lang="scss" scoped>
.home-catalog {
  margin-top: 60px;
  padding: 0 1.5rem 48px;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
    flex-wrap: wrap;
    gap: 1rem;
  }

  &__title {
    h2 {
      margin: 0;
      font-size: 36px;
      font-weight: 700;
      line-height: 1.1;
      color: #020617;
    }

    p {
      margin: 4px 0 0;
      font-size: 18px;
      color: #475569;
    }
  }

  &__filters {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    padding-top: 8px;
  }
}

// GRID 5x5
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.25rem;
  width: 100%;
}

.search-container {
  width: 256px;
}

.search-error {
  margin: 4px 0 0;
  color: #dc3545;
  font-size: 14px;
}

// Responsive
@media (max-width: 1400px) {
  .home-catalog {
    max-width: 100%;
    padding: 0 1rem 48px;
  }
  
  .catalog-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 1100px) {
  .catalog-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .home-catalog {
    margin-top: clamp(96px, 28vh, 180px);
    padding: 0 1rem 48px;

    &__header {
      flex-direction: column;
      align-items: center;
      margin-bottom: 24px;
    }

    &__title {
      text-align: center;
      
      h2 {
        font-size: 30px;
      }

      p {
        font-size: 16px;
      }
    }

    &__filters {
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding-top: 0;
    }
  }

  .search-container {
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    // Asegurar que el input dentro esté centrado
    :deep(input) {
      text-align: center;
      width: 100%;
    }
  }

  .search-error {
    text-align: center;
    width: 100%;
  }

  .catalog-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .catalog-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>