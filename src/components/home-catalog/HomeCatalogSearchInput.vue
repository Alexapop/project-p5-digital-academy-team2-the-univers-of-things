<script setup>
import searchIcon from "@/assets/home-catalog/home-search-input-icon.png";

const text = defineModel({
  type:String,
  default:''
})

</script>

<template>
  <div>
    <img
      :src="searchIcon"
      alt="Magnifying glass search icon for anime catalog"
    />
    <input v-model="text" type="search" placeholder="Buscar anime..." />
  </div>
</template>

<style lang="scss" scoped>
div {
  position: relative;
  width: 100%;
  max-width: 256px;
}
img {
  position: absolute;
  left: 12px;
  top: 50%;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  pointer-events: none;
}

input {
  width: 100%;
  height: 34px;
  padding: 4px 12px 4px 36px;
  border-radius: 8px;
  border: 1.7px solid #cbd5e1;
  font-size: 14px;
  font-weight: 480;
  background-color: #f8fafc;
  font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
  line-height: 20px;
  color: #000;
}
input:focus {
  outline: none;
  border-color: lab(44.1718% 42.6675 -75.4052);
  box-shadow: 0 0 0 1px lab(76.36% 8.61 -22.65);
}
input::placeholder {
  color: #475569;
  opacity: 1;
}
</style>
