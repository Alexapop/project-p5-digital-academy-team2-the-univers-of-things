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

    <div class="card shadow" style="width: 18rem;">
        <img :src="anime.images.jpg.image_url" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{anime.title}}</h5>
            <h6 class="card-title">⭐ {{anime.score}}</h6>
            <ul class="genres flex-wrap overflow-hidden" style="max-height: 2rem; line-height: 1.5;">
                <li v-for="genre in displayedGenres(anime.genres)" :key="genre.name">{{ genre.name }}</li>
            </ul>
            <p class="card-text">{{anime.synopsis}}</p>
            <div class="card-buttons">
                <router-link :to="'/anime/' + anime.mal_id" class="btn btn-primary">See more</router-link>
                <FavoriteButton />
            </div>
        </div>
    </div>

    <main>
    </main>
</template>

<style scoped>
.card {
    border-radius: 1rem;
}

img {
    border-radius: 1rem 1rem 0rem 0rem;
    max-height: 20rem;
    object-fit: cover;
}

.card-text {

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(103, 110, 110);
}

.card-title {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.genres {
    list-style-type: none;
    margin: 0px;
    margin-bottom: 10px;
    padding: 0px;
    display: flex;
    font-size: 12px;
    
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
    justify-content: space-between;
}

.btn-primary {
    background: linear-gradient(135deg, #7c4dff, #b766f2);
    border-style: none;
    max-height: 40px;
    vertical-align: middle;
}

.btn-primary:hover {
    filter: brightness(125%);
}

.btn-secondary {
    background-color: rgb(221, 224, 224);
    border-style: none;
    color: black;
    padding: 10px;
    text-align: center;
    border-radius: 100%;
}

.btn-secondary:hover {
    filter: brightness(105%);
}
</style>
