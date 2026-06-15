<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/header/HeaderComponent.vue'
import LoginButton from './components/login/LoginButton.vue'

</script>

<template>
  <header>
    <HeaderComponent />
    <LoginButton /> 
  </header>
  
  <RouterView />
</template>

<style scoped>

</style>
