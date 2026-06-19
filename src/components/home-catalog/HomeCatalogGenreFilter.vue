<script setup>
import { ref } from "vue"

const selectedGenre = defineModel({
  type:String,
  default:""
})

const items = ref([
  { id: 1, name: "Todos los géneros", value: "" },
  { id: 2, name: "Acción", value: "Action" },
  { id: 3, name: "Aventura", value: "Adventure" },
  { id: 10, name: "Ciencia Ficción", value: "Sci-Fi" },
  { id: 4, name: "Comedia", value: "Comedy" },
  { id: 12, name: "Deportes", value: "Sports" },
  { id: 5, name: "Drama", value: "Drama" },
  { id: 6, name: "Fantasia", value: "Fantasy" },
  { id: 19, name: "Gore", value: "Gore" },
  { id: 7, name: "Horror", value: "Horror" },
  { id: 15, name: "Isekai", value: "Isekai" },
  { id: 20, name: "Mecha", value: "Mecha" },
  { id: 8, name: "Misterio", value: "Mystery" },
  { id: 14, name: "Musical", value: "Music" },
  { id: 17, name: "Parodia", value: "Parody" },
  { id: 9, name: "Romance", value: "Romance" },
  { id: 16, name: "Shonen", value: "Shounen" },
  { id: 13, name: "Superpoderes", value: "Super Power" },
  { id: 18, name: "Tokusatsu", value: "Tokusatsu" },
  { id: 11, name: "Vida Cotidiana", value: "Slice of Life" }
]);
</script>

<template>
  <select v-model="selectedGenre">
    <option v-for="item in items" :key="item.id" :value="item.value">
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
