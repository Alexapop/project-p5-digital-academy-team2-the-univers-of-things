<script setup>
import FavoriteButton from './FavoriteButton.vue';

defineProps({
  anime: {
    type: Object,
    required: true
  }
})

const displayedGenres = (genres) => {
  if (!genres) return []
  return genres.slice(0, 3)
}
</script>

<template>
  <div class="card shadow anime-card">
    <img 
      :src="anime?.images?.jpg?.image_url || anime?.image_url || 'https://via.placeholder.com/260x400?text=No+Image'" 
      class="card-img-top" 
      alt="Anime Poster"
    >
    <div class="card-body">
      <h5 class="card-title">{{ anime?.title || 'Sin título' }}</h5>
      <h6 class="card-score">⭐ {{ anime?.score || 'N/A' }}</h6>
      
      <ul class="genres flex-wrap overflow-hidden">
        <li v-for="genre in displayedGenres(anime?.genres)" :key="genre.name">
          {{ genre.name }}
        </li>
      </ul>
      
      <p class="card-text">{{ anime?.synopsis || 'Sin sinopsis disponible.' }}</p>
      
      <div class="card-buttons">
        <router-link :to="'/anime/' + anime?.mal_id" class="btn btn-primary">See more</router-link>
        <FavoriteButton :anime="anime" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.anime-card {
    border-radius: 1rem;
    width: 100% !important;
    max-width: 100% !important;
    height: 100%;
    display: flex;
    flex-direction: column;
}

img {
    border-radius: 1rem 1rem 0 0;
    width: 100%;
    height: 280px;
    object-fit: cover;
}

.card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.card-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: rgb(103, 110, 110);
    font-size: 0.85rem;
    flex: 1;
    margin-bottom: 1rem;
}

.card-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1rem;
    margin-bottom: 0.25rem;
    font-weight: 700;
}

.card-score {
    color: #f39c12;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.genres {
    list-style-type: none;
    margin: 0 0 10px 0;
    padding: 0;
    display: flex;
    font-size: 11px;
    max-height: 2rem;
    line-height: 1.5;
}

.genres li {
    background-color: rgb(221, 224, 224);
    padding: 4px 8px;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 2rem;
    font-weight: bold;
    white-space: nowrap;
}

.card-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
}

.btn-primary {
    background: linear-gradient(135deg, #7c4dff, #b766f2);
    border-style: none;
    border-radius: 2rem;
    padding: 8px 16px;
    font-size: 0.85rem;
    flex: 1;
    margin-right: 8px;
    text-align: center;
    text-decoration: none;
    color: white;
    transition: filter 0.2s ease;
}

.btn-primary:hover {
    filter: brightness(125%);
    color: white;
}
</style>
