<script setup>
// Código limpio
</script>

<template>
  <div class="weekly-badge">
    <svg class="weekly-badge__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/>
    </svg>
    <span class="weekly-badge__text">ANIME DE LA SEMANA</span>
  </div>
</template>

<style lang="scss" scoped>
.weekly-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #fafdff; /* Fondo gris/azulón claro original */
  padding: 0.85rem 1.5rem;
  border-radius: 8px 8px 0 0;
  border: 1px solid #eaeaea;
  border-bottom: none;
  width: 100%;

  // 🔥 Aquí controlamos el tamaño y el color morado exacto del calendario
  &__icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #8a4fff; /* Tu morado corporativo */
    flex-shrink: 0;
  }

  &__text {
    font-weight: 700;
    font-size: 0.85rem;
    color: #2b303a; 
    letter-spacing: 0.05em;
  }
}
</style>