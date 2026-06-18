<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { animeService } from '@/services/animeService'
import AnimeDetail from '@/components/detail/AnimeDetail.vue'
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'

const route = useRoute()
const anime = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    anime.value = await animeService.getAnimeById(route.params.id)
  } catch (e) {
    error.value = 'Error al cargar el anime'
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
    <HeaderComponent />

    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error }}</div>
    <AnimeDetail v-else :anime="anime" />

    <FooterComponent />
</template>