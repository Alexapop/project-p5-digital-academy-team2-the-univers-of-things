<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/header/HeaderComponent.vue'

</script>

<template>
  <header>
    <HeaderComponent />
  </header>
  
  <RouterView />
</template>

<style scoped>

</style>