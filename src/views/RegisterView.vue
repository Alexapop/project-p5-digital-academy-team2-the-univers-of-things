<script setup>
import RegisterForm from '@/components/auth/RegisterForm.vue'
import RegisterInfo from '@/components/auth/RegisterInfo.vue'
</script>

<template>
    <main class="register-page">
        <RegisterForm />
        <RegisterInfo />
    </main>
</template>

<style scoped lang="scss">
    .register-page {
        min-height: 100vh;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 1024px) {
        .register-page {
            display: block;
        }
    }
</style>