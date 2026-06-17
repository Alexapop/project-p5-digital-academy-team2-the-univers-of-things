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

<style lang="scss" scoped>
select {
   position: relative;
  max-width: 256px;
  width: 100%;
  height: 34px;
  padding: 4px 12px 4px 36px;
  border-radius: 8px;
  border: 1.7px solid #cbd5e1;
  background-color: #f8fafc;
  font-size: 14px;
  font-weight: 480;
   line-height: 20px;
  color: #000;
}

select:focus {
  outline: none;
  border-color: lab(44.1718% 42.6675 -75.4052);
}

select::placeholder {
  color: #475569;
  opacity: 1;}
</style>
