<script setup>
import LogoComponent from "../logo/LogoComponent.vue";
import LoginButton from "../login/LoginButton.vue";
import RegisterButton from "../register/RegisterButton.vue";
</script>

<template>
  <header class="header">
    <LogoComponent />
    <div class="d-flex align-items-center gap-2">
      <LoginButton />
      <RegisterButton label="Crear cuenta" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  min-height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #dde2ea;

  position: sticky;
  top: 0;
  z-index: 100;
}
</style>
