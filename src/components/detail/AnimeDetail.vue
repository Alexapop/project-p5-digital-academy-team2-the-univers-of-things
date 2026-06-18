<script setup>
import FavoriteButton from '/src/components/card/FavoriteButton.vue';

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

    <div class="container">
        <router-link :to="'/'" class="volver-catalogo">← Volver al catálogo</router-link><br>
        <img :src="anime.images.jpg.image_url" class="card-img-top shadow" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{anime.title}}</h5>
            <div class="card-buttons">
                <h6 class="card-title">⭐ {{anime.score}}</h6>
                <FavoriteButton />
            </div>
            <ul class="genres flex-wrap overflow-hidden" style="max-height: 2rem; line-height: 1.5;">
                <li v-for="genre in displayedGenres(anime.genres)" :key="genre.name">{{ genre.name }}</li>
            </ul>
            <p class="card-text">{{anime.synopsis}}</p>            
        </div>
    </div>

    <main>
    </main>
</template>

<style scoped>

.container {
    width: 50%;
    margin-top: 20px;
    margin-bottom: 20px;
}

img {
    border-radius: 1rem;
    max-width: 15rem;
    object-fit: cover;
    margin-bottom: 15px;
}

h5 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 15px;
}

h6 {
    font-size: 20px;
    margin-right: 20px;
}

.card-text {
    font-size: 16px;
}

.genres {
    list-style-type: none;
    margin-bottom: 15px;
    padding: 0px;
    display: flex;
    font-size: 15px;
}

.genres li {
    background-color: rgb(221, 224, 224);
    padding: 8px 12px 8px 12px;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 2rem;
    font-weight: bold;
}

.card-buttons {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.volver-catalogo {
    color: black;
    text-decoration: none;
    margin-bottom: 15px;
}

.volver-catalogo:hover {
    text-decoration: underline;
}

.volver-catalogo:visited {
    text-decoration: none;
}

@media (max-width: 768px) {
    .container {
        width: 80%;
    }
}
</style>
