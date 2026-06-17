<script setup>
import LogoComponent from '@/components/logo/LogoComponent.vue'
</script>

<template>
        <section class="login-hero">
            <div class="login-logo">
                <LogoComponent/>
            </div>
            <div class="login-hero-content">
                <h1>Tu colección anime, siempre contigo.</h1>
                <p>Inicia sesión para acceder a tus favoritos, valoraciones y panel personalizado</p>
            </div>
        </section>
</template>

<style lang="scss" scoped>

    .login-hero {
        padding: 48px;
        background: #050917;
        color: #DADEE5;
        display: flex;
        flex-direction: column;
       

        &-content {
            max-width: 690px;
            flex: 2.7;
            display: flex;
            flex-direction: column;
            justify-content: center;
            
            h1 {
                font-size: 36px;
                font-weight: 700;
                line-height: 1.25;
                font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;

            }

            p {
                margin-top: 16px;
                line-height: 1.4;
                color: #b8c2d6;
                max-width: 448px;
            }
        }

    }
    .login-logo {
         flex: 1;
    }

    @media (max-width: 1024px) {
        .login-hero {
        display: none;
        }
    }
</style>