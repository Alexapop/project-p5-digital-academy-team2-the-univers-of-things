<script setup>
import { RouterLink } from "vue-router";

defineProps({
  label: {
    type: String,
    default: "Crear cuenta",
  },
});
</script>

<template>
  <RouterLink to="/register" class="btn register-button fw-semibold">
    {{ label }}
  </RouterLink>
</template>

<style lang="scss" scoped>
.register-button {
  padding: 10px 16px;
  border: 0;
  border-radius: 12px;
  color: white;
  background: linear-gradient(135deg, #754cf5, #b960ec);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;

  &:hover {
    color: white;
    filter: brightness(1.08);
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(117, 76, 245, 0.3);
  }
}
</style>
