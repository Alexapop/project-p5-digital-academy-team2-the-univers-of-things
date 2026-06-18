<script setup>
import LoginButton from '../login/LoginButton.vue'
import WeeklyBadge from './WeeklyBadge.vue'
import AnimeCard from '../card/AnimeCard.vue'
</script>

<template>
  <section class="hero">
    <div class="hero__content">
      <h1 class="hero__title">
        Tu universo <span class="hero__title--highlight">anime</span>,<br>organizado.
      </h1>
      <p class="hero__description">
        Explora miles de series, guarda tus favoritas y valora cada una en tu propio dashboard.
      </p>
      
      <div class="hero__actions">
        <LoginButton />
      </div>
    </div>

    <div class="hero__featured">
      <WeeklyBadge />
      
      <div class="weekly-card-slot">
        <AnimeCard v-if="topAnime" :anime="topAnime" />
        <div v-else class="text-center text-muted">Cargando...</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 2rem;
  background-color: #fafdff; 

  &__content {
    max-width: 50%;
  }

  &__title {
    font-size: 3rem;
    color: #1a1a1a;
    font-weight: 700;

    &--highlight {
      color: #8a4fff; // El morado corporativo
    }
  }

  &__description {
    color: #666;
    margin: 1.5rem 0;
    font-size: 1.1rem;
  }

  &__actions {
    display: flex;
    gap: 1rem;
  }

  &__featured {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px; // El ancho de la tarjeta según el diseño
  }
}

.weekly-card-slot {
  width: 100%;
  min-height: 400px; // El espacio que ocupará la foto de Frieren
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-top: none; // Para que encaje perfectamente con el borde inferior del cartel
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  // 🔥 Cambios aplicados para centrar la tarjeta de Hanna:
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
</style>