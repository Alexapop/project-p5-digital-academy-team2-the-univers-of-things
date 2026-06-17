<script setup>
import HeaderComponent from "@/components/header/HeaderComponent.vue";
import HeroSection from "@/components/hero/HeroSection.vue";
import HomeCatalogSection from "@/components/home-catalog/HomeCatalogSection.vue";
import FooterComponent from "@/components/footer/FooterComponent.vue";
import AnimeDetail from "@/components/detail/AnimeDetail.vue";
</script>

<template>
  <HeaderComponent />

  <HeroSection />

  <main>
  <HomeCatalogSection />
  </main>

  <FooterComponent />
</template>
