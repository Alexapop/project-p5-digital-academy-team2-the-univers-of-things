<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
import LoginInfo from '@/components/auth/LoginInfo.vue'
</script>

<template>
  <main class="login-page">
    <LoginInfo />
    <LoginForm />
  </main>
</template>

<style scoped lang="scss">
    .login-page {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 1024px) {
      .login-page {
        display: block;
      }
    }
</style>