<script setup>
import LogoComponent from '@/components/logo/LogoComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const emailError = ref('')
const passwordError = ref('')
const loginError = ref('')

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()

async function login() {
    emailError.value = ''
    passwordError.value = ''
    loginError.value = ''

    if (!email.value) {
        emailError.value = 'Correo inválido'
    }

    if (!password.value || password.value.length < 6){
        passwordError.value = 'Mínimo 6 caracteres'
    }

    if (emailError.value || passwordError.value) {
        return
    }

    const authenticatedUser = authStore.login(email.value, password.value)

    if (authenticatedUser) {
        if (authenticatedUser.role === 'admin') {
            router.push('/admin/usuarios')
            return
        }
        
        // Si no viene de ninguna redirección forzada, mándalo directo al perfil del dashboard
        const redirectPath = route.query.redirect || '/dashboard/perfil'
        router.push(redirectPath)
        return
    }

    loginError.value = 'Credenciales incorrectas'
}
</script>

<template>
        <section class="login-panel">
            <form class="login-form" @submit.prevent="login">
                <div v-if="loginError" class="login-form-alert">
                    <span>!</span>
                    {{ loginError }}
                </div>

                <div class="login-form-logo">
                    <LogoComponent />
                </div>

                <h2>Bienvenido de vuelta</h2>
                <p>Inicia sesión en tu cuenta.</p>

                <label for="email">Correo electrónico</label>
                <input id="email" v-model="email" type="email" />
                <p v-if="emailError" class="login-form-error">
                    {{ emailError }}
                </p>

                <label for="password">Contraseña</label>
                <input id="password" v-model="password" type="password" />
                <p v-if="passwordError" class="login-form-error">
                    {{ passwordError }}
                </p>

                <button type="submit">Entrar</button>

                <p class="login-form-register">
                    ¿No tienes cuenta?
                    <RouterLink to="/register">Regístrate</RouterLink>
                </p>
                
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

        &-alert {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 56px;
            padding: 16px 20px;
            border: 1px solid #fecaca;
            border-radius: 10px;
            background: #fef2f2;
            color: #dc2626;
            font-size: 16px;
            font-weight: 500;
        }

        span {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #dc2626;
            color: #ffffff;
            font-size: 16px;
            font-weight: 700;
        }

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

        p.login-form-error {
            margin-top: 4px;
            color: #ff0000;
            font-size: 12px;
            line-height: 1.2;
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

        p.login-form-register {
            margin-top: 24px;
            text-align: center;

            a {
                color: #7c4dff;
                text-decoration: none;
                font-weight: 500;
            }
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