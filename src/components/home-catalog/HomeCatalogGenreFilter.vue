<script setup>
import { ref } from "vue";
const selectedGenre = ref("Todos los géneros");
const items = ref([
  { id: 1, name: "Todos los géneros" },
  { id: 2, name: "Acción" },
  { id: 3, name: "Aventura" },
  { id: 4, name: "Comedia" },
  { id: 5, name: "Drama" },
  { id: 6, name: "Fantasia" },
  { id: 7, name: "Horror" },
  { id: 8, name: "Misterio" },
  { id: 9, name: "Romance" },
  { id: 10, name: "Ciencia Ficción " },
  { id: 11, name: "Vida Cotidiana" },
  { id: 12, name: "Deportes" },
  { id: 13, name: "Sobrenatural" },
  { id: 14, name: "Suspense" },
]);
</script>

<template>
  <select v-model="selectedGenre">
    <option v-for="item in items" :key="item.id">
      {{ item.name }}
    </option>
  </select>
</template>

<style lang="scss" scoped></style>
