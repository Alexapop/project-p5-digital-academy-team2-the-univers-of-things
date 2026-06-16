<script setup>

</script>

<template>
  <div class="weekly-badge">
    <span class="weekly-badge__icon">📅</span>
    <span class="weekly-badge__text">ANIME DE LA SEMANA</span>
  </div>
</template>

<style lang="scss" scoped>
.weekly-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px 8px 0 0;
  border: 1px solid #eaeaea;
  border-bottom: none;
  width: 100%;

  &__text {
    font-weight: 700;
    font-size: 0.85rem;
    color: #333333;
    letter-spacing: 0.05em;
  }
}
</style>