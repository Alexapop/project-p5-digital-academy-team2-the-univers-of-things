<script setup>
import { onMounted } from 'vue'
import { useAnimeStore } from '@/stores/animeStore'
import HomeCatalogSearchInput from "./HomeCatalogSearchInput.vue"
import HomeCatalogGenreFilter from "./HomeCatalogGenreFilter.vue"
import PaginationHub from "../pagination/PaginationHub.vue"
import AnimeCard from "../card/AnimeCard.vue"

const animeStore = useAnimeStore()

onMounted(() => {
  if (animeStore.animes.length === 0) {
    animeStore.fetchAnimes()
  }
})
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
        <HomeCatalogSearchInput />
        <HomeCatalogGenreFilter />
      </div>
    </header>

    <div v-if="animeStore.loading" class="text-center py-5">Cargando...</div>
    <div v-else-if="animeStore.error" class="alert alert-danger">{{ animeStore.error }}</div>

    <div v-else class="d-flex flex-wrap justify-content-center px-4 px-md-5" style="gap: 0.5rem;">
  <div v-for="anime in animeStore.paginatedAnimes" :key="anime.mal_id" style="width: 18rem;">
    <AnimeCard :anime="anime" />
  </div>
</div>

    <PaginationHub />
  </section>
</template>

<style lang="scss" scoped>
.home-catalog {
  margin-top: 60px;
  padding-bottom: 48px;

  &__header {
    margin-bottom: 32px;
    margin-left: 100px;
    margin-right: 100px;
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

@media (max-width: 767.98px) {
  .home-catalog {
    margin-top: clamp(96px, 28vh, 180px);

    &__header {
      margin-bottom: 24px;
      margin-left: 0px;
      margin-right: 0px;
    }

    &__title {
      h2 {
        font-size: 30px;
        text-align: center;
      }

      p {
        font-size: 16px;
        text-align: center;
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