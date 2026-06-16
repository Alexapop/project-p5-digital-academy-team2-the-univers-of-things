<script setup>
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import LoginButton from '../components/login/LoginButton.vue'
import PaginationHub from '../components/pagination/PaginationHub.vue'
import HomeCatalogSearchInput from "@/components/home-catalog/HomeCatalogSearchInput.vue"
import HomeCatalogGenreFilter from "@/components/home-catalog/HomeCatalogGenreFilter.vue"
import FooterComponent from '@/components/footer/FooterComponent.vue'
</script>

<template>
  <HeaderComponent />

  <h1>The Univers of Things</h1>
  <LoginButton />


  <main>
    <div>
      <HomeCatalogSearchInput />
      <HomeCatalogGenreFilter />
    </div>
    
    <PaginationHub />

  </main>

  <FooterComponent />

</template>
