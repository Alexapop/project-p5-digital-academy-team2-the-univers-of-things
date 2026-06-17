<script setup>
import FavoriteButton from '@/components/card/FavoriteButton.vue';

</script>

<template>

    <div class="card shadow" style="width: 18rem;">
        <img src="/src/assets/19644l.webp" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Cowboy Bebop</h5>
            <h6 class="card-title">⭐ 8.75</h6>
            <ul class="genres">
                <li>Action</li>
                <li>Award Winning</li>
                <li>Sci-Fi</li>
            </ul>
            <p class="card-text">Crime is timeless. By the year 2071, humanity has expanded across the galaxy, filling
                the surface of other planets with sett…unravel, Spike must choose between life with his newfound family
                or revenge for his old wounds.</p>
            <div class="card-buttons">
                <a href="" class="btn btn-primary">See more</a>
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

.genres {
    list-style-type: none;
    margin: 0px;
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
