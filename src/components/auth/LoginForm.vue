<script setup>
import LogoComponent from '@/components/logo/LogoComponent.vue'
</script>

<template>
        <section class="login-panel">
            <form class="login-form">
                <div class="login-form-logo">
                    <LogoComponent />
                </div>
                <h2>Bienvenido de vuelta</h2>
                <p>Inicia sesión en tu cuenta.</p>

                <label for="email">Correo electrónico</label>
                <input id="email" type="email" />

                <label for="password">Contraseña</label>
                <input id="password" type="password" />

                <button type="submit">Entrar</button>
                
            </form>
        </section>
</template>

<style lang="scss" scoped>
    .login-panel {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 48px;
        background: #f8fafc;
    }

    .login-form {
        width: 100%;
        max-width: 448px;

        h2 {
            font-size: 30px;
            font-weight: 700;
            line-height: 1.2;
            letter-spacing: -.02em;
            font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
        }

        p {
            margin-top: 4px;
            color: #4b5563;
            font-size: 14px;
            line-height: 1.4;
        }

        label {
            display: block;
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 14px;
            color: #0a121f;
            font-weight: 500;
        }

        input {
            padding: 0 12px;
            width: 100%;
            height: 36px;
            border: 1px solid #dde2ea;
            border-radius: 10px;
            background: #f8fafc;
            box-shadow: 0 2px 8px rgba(15, 23, 42, 0.12);
        }

        input:focus {
            outline: none;
            border-color: #6c50e9;
            border: 1px solid #6c50e9;
        }

        button {
            width: 100%;
            height: 40px;
            margin-top: 30px;
            border: 0;
            border-radius: 10px;
            background: linear-gradient(135deg, #7c4dff, #b766f2);
            color: #ffffff;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
        }
    }

    .login-form-logo {
        display: none;
    }

    @media (max-width: 1024px) {
        .login-panel {
            min-height: 100vh;
            padding: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .login-form {
            width: 100%;
            max-width: 448px;
        }

        .login-form-logo {
            display: block;
            margin-bottom: 24px;
        }
    }

    @media (max-width: 480px) {
        .login-panel {
            padding: 20px;
        }

        .login-form {
            max-width: 100%;
            transform: translateY(-24px);
        }
    }
    
</style>