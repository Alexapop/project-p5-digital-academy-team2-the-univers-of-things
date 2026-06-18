<script setup>
import { computed, onMounted, ref } from "vue";
import { useAnimeStore } from "@/stores/animeStore";
import HomeCatalogSearchInput from "./HomeCatalogSearchInput.vue";
import HomeCatalogGenreFilter from "./HomeCatalogGenreFilter.vue";
import PaginationHub from "../pagination/PaginationHub.vue";
import AnimeCard from "../card/AnimeCard.vue";

const animeStore = useAnimeStore();
const searchText = ref("");

onMounted(() => {
  if (animeStore.animes.length === 0) {
    animeStore.fetchAnimes();
  }
});

const searchError = computed(() => {
  const query = searchText.value.trim();

  if (query === "") {
    return "";
  }

  if (!/^[a-zA-Z\s]+$/.test(query)) {
    return "Por favor, introduce solo letras.";
  }

  return "";
});
const filteredAnimes = computed(() => {
  const query = searchText.value.trim().toLowerCase();

  if (query === "") {
    return animeStore.paginatedAnimes;
  }

  if (searchError.value !== "") {
    return [];
  }

  return animeStore.animes.filter((anime) =>
    anime.title.toLowerCase().includes(query),
  );
});
</script>

<template>
  <section class="home-catalog container-fluid px-4 px-lg-5">
    <header
      class="home-catalog__header d-flex flex-column flex-lg-row justify-content-between gap-3"
    >
      <div class="home-catalog__title">
        <h2>Cat&aacute;logo</h2>
        <p>Filtra por g&eacute;nero, busca y descubre algo nuevo.</p>
      </div>

      <div class="home-catalog__filters d-flex flex-column flex-sm-row gap-2">
        <div class="search-container">
          <HomeCatalogSearchInput v-model="searchText" />
          <p v-if="searchError" class="search-error">
            {{ searchError }}
          </p>
        </div>
        <HomeCatalogGenreFilter />
      </div>
    </header>

    <div v-if="animeStore.loading" class="text-center py-5">Cargando...</div>
    <div v-else-if="animeStore.error" class="alert alert-danger">
      {{ animeStore.error }}
    </div>

    <div
      v-else-if="
        searchText.trim() !== '' &&
        searchError === '' &&
        filteredAnimes.length === 0
      "
      class="alert alert-info text-center"
    >
      No tenemos este anime disponible.
    </div>

    <div
      v-else
      class="d-flex flex-wrap justify-content-center px-4 px-md-5"
      style="gap: 0.5rem"
    >
      <div
        v-for="anime in filteredAnimes"
        :key="anime.mal_id"
        style="width: 18rem"
      >
        <AnimeCard :anime="anime" />
      </div>
    </div>

    <PaginationHub v-if="searchText.trim() === ''" />
  </section>
</template>

<style lang="scss" scoped>
.home-catalog {
  margin-top: 60px;
  padding-bottom: 48px;

  &__header {
    margin-bottom: 32px;
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
    align-items: flex-start;
    padding-top: 32px;

    :deep(> div),
    :deep(> select) {
      margin: 0;
    }

    :deep(> div) {
      width: auto;
      max-width: 320px;
    }

    :deep(> select) {
      width: 220px;
      max-width: 220px;
      padding-left: 16px;
    }
  }

  :deep(.card) {
    width: 100% !important;
    height: 100%;
    overflow: hidden;
  }

  :deep(.card-img-top) {
    width: 100%;
    height: clamp(260px, 32vw, 420px);
    object-fit: cover;
  }
}

.search-container {
  width: 256px;
}

.search-error {
  margin: 4px 0 0;
  color: #dc3545;
  font-size: 14px;
}
@media (max-width: 767.98px) {
  .home-catalog {
    margin-top: clamp(96px, 28vh, 180px);

    &__header {
      margin-bottom: 24px;
    }

    &__title {
      h2 {
        font-size: 30px;
      }

      p {
        font-size: 16px;
      }
    }

    &__filters {
      padding-top: 0;

      :deep(> div),
      :deep(> select) {
        width: 100%;
        max-width: none;
      }
    }

    :deep(.card-img-top) {
      height: clamp(190px, 58vw, 280px);
    }
  }
}
</style>
