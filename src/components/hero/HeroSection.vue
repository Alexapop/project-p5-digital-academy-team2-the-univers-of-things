<script setup>
import RegisterButton from "../register/RegisterButton.vue";
import LoginButton from "../login/LoginButton.vue";
import WeeklyBadge from "./WeeklyBadge.vue";
import AnimeCard from "../card/AnimeCard.vue";

// 1. Importamos AMBOS stores (el de admin para la tarjeta y el de auth para los botones)
import { useAdminStore } from "@/stores/admin";
import { useAuthStore } from "@/stores/auth";

// 2. Los instanciamos correctamente
const adminStore = useAdminStore();
const authStore = useAuthStore();
</script>

<template>
  <section class="hero">
    <div class="hero__content">
      <h1 class="hero__title">
        Tu universo
        <span class="hero__title--highlight">anime</span>,<br />organizado.
      </h1>
      <p class="hero__description">
        Explora miles de series, guarda tus favoritas and valora cada una en tu
        propio dashboard.
      </p>

      <div class="hero__actions">
        <template v-if="!authStore.currentUser">
          <RegisterButton label="Crear cuenta gratis" />
          <LoginButton />
        </template>
        
        <template v-else>
          <div class="welcome-badge">
            👋 ¡Hola de nuevo, <span class="fw-bold">{{ authStore.currentUser.name }}</span>!
          </div>
        </template>
      </div>
    </div>

    <div class="hero__featured">
      <WeeklyBadge />

      <div class="weekly-card-slot">
        <AnimeCard
          v-if="adminStore.weeklyAnime"
          :anime="adminStore.weeklyAnime"
        />

        <div v-else class="text-center text-muted">
          ¡Selección disponible próximamente!
        </div>
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
  margin-left: 100px;
  margin-right: 100px;

  &__content {
    max-width: 50%;
  }

  &__title {
    font-size: 3rem;
    color: #1a1a1a;
    font-weight: 700;

    &--highlight {
      color: #8a4fff;
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
    align-items: center;
  }

  &__featured {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
  }
}

// Estilo simple para el mensajito de bienvenida
.welcome-badge {
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1.05rem;
}

.weekly-card-slot {
  width: 100%;
  min-height: 400px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

@media (max-width: 767.98px) {
  .hero {
    flex-direction: column;
    margin: 0px;

    &__content {
      max-width: 100%;
      text-align: center;
    }

    &__actions {
      justify-content: center;
    }

    &__featured {
      margin-top: 30px;
    }
  }
}
</style>
