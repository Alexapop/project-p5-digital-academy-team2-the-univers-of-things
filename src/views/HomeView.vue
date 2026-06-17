<script setup>
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import LoginButton from '../components/login/LoginButton.vue'
import HomeCatalogSection from '@/components/home-catalog/HomeCatalogSection.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'
import AnimeDetail from '@/components/detail/AnimeDetail.vue';
</script>

<template>
  <HeaderComponent />

  <h1>The Univers of Things</h1>
  <LoginButton />

  <main>
  <HomeCatalogSection/>
  </main>

  <FooterComponent />

</template>