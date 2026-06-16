<script setup>
import HeroSection from '../components/hero/HeroSection.vue'
import PaginationHub from '../components/pagination/PaginationHub.vue'

import HomeCatalogSearchInput from "@/components/home-catalog/HomeCatalogSearchInput.vue";
import HomeCatalogGenreFilter from "@/components/home-catalog/HomeCatalogGenreFilter.vue";
</script>

<template>
  <h1>The Univers of Things</h1>
  
  <HeroSection />

  <main>
    <div>
      <HomeCatalogSearchInput />
      <HomeCatalogGenreFilter />
    </div>
    
    <PaginationHub />
    


  </main>


</template>
