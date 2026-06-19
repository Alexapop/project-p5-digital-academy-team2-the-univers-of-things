<script setup>
</script>

<template>
    <section class="register-info">
        <div class="register-info-content">
            <h1>Únete a la comunidad otaku.</h1>

            <p>
                Crea tu cuenta gratis y empieza a curar tu lista personal de series, valoraciones y descubrimientos.
            </p>

            <ul>
                <li>✦ Guarda favoritos ilimitados</li>
                <li>✦ Valora con sistema de 5 estrellas</li>
                <li>✦ Personaliza tu avatar y perfil</li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .register-info {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 48px;
        background: #050917;
        color: #dadee5;
    }

    .register-info-content {
        width: 100%;
        max-width: 690px;
        min-height: 560px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    h1 {
        font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
        font-size: 36px;
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: -.02em;
    }

    p {
        margin-top: 16px;
        color: #b8c2d6;
    }

    ul {
        font-size: 14px;
        margin-top: 36px;
        line-height: 1.4;
        list-style: none;
        padding-left: 0;
    }

    li {
        margin-bottom: 8px;
        color: #b8c2d6;
    }

    @media (max-width: 1024px) {
        .register-info {
            display: none;
        }
    }
</style>