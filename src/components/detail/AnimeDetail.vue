<script setup>
import FavoriteButton from '/src/components/card/FavoriteButton.vue';

</script>

<template>

    <div class="container">
        <a href="..." class="volver-catalogo">← Volver al catálogo</a><br>
        <img src="/src/assets/19644l.webp" class="card-img-top" alt="...">
        <div>
            <h5 class="card-title">Cowboy Bebop</h5>
            <div class="card-buttons">
                <h6 class="card-title">⭐ 8.75</h6>
                <FavoriteButton />
            </div>
            <ul class="genres">
                <li>Action</li>
                <li>Award Winning</li>
                <li>Sci-Fi</li>
            </ul>
            <h6>Synopsis</h6>
            <p class="card-text">Crime is timeless. By the year 2071, humanity has expanded across the galaxy, filling the surface of other planets with settlements like those on Earth. These new societies are plagued by murder, drug use, and theft, and intergalactic outlaws are hunted by a growing number of tough bounty hunters.\n\nSpike Spiegel and Jet Black pursue criminals throughout space to make a humble living. Beneath his goofy and aloof demeanor, Spike is haunted by the weight of his violent past. Meanwhile, Jet manages his own troubled memories while taking care of Spike and the Bebop, their ship. The duo is joined by the beautiful con artist Faye Valentine, odd child Edward Wong Hau Pepelu Tivrusky IV, and Ein, a bioengineered Welsh corgi.\n\nWhile developing bonds and working to catch a colorful cast of criminals, the Bebop crew's lives are disrupted by a menace from Spike's past. As a rival's maniacal plot continues to unravel, Spike must choose between life with his newfound family or revenge for his old wounds.</p>
        </div>
    </div>

    <main>
    </main>
</template>

<style scoped>

.container {
    width: 50%;
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
</style>
