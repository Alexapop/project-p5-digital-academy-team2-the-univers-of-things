<script setup>
<<<<<<< HEAD
import HeaderComponent from "@/components/header/HeaderComponent.vue";
import HeroSection from "@/components/hero/HeroSection.vue";
import HomeCatalogSection from "@/components/home-catalog/HomeCatalogSection.vue";
import FooterComponent from "@/components/footer/FooterComponent.vue";
import AnimeDetail from "@/components/detail/AnimeDetail.vue";
=======
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import LoginButton from '../components/login/LoginButton.vue'
import PaginationHub from '../components/pagination/PaginationHub.vue'
import HomeCatalogSearchInput from "@/components/home-catalog/HomeCatalogSearchInput.vue"
import HomeCatalogGenreFilter from "@/components/home-catalog/HomeCatalogGenreFilter.vue"
import FooterComponent from '@/components/footer/FooterComponent.vue'
import AnimeDetail from '@/components/detail/AnimeDetail.vue';
import FeaturedAnime from '@/components/featured/FeaturedAnime.vue'
>>>>>>> feat/api-integration
</script>

<template>
  <HeaderComponent />

<<<<<<< HEAD
  <HeroSection />

  <main>
  <HomeCatalogSection />
=======
  <h1>The Univers of Things</h1>
  
  <LoginButton />

  <main>
    <div>
      <FeaturedAnime />
    </div>
    <div>
      <HomeCatalogSearchInput />
      <HomeCatalogGenreFilter />
    </div>
    
    <PaginationHub />

>>>>>>> feat/api-integration
  </main>

  <FooterComponent />
</template>
