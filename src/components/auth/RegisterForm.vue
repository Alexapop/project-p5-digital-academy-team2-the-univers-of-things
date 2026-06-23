<script setup>
import LogoComponent from '@/components/logo/LogoComponent.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { RouterLink, useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const nameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')

const authStore = useAuthStore()
const router = useRouter()

function register() {
    nameError.value =''
    emailError.value =''
    passwordError.value =''
    confirmPasswordError.value =''

    if (!name.value || name.value.length < 2) {
        nameError.value = 'Mínimo 2 caracteres'
    }

    if (!email.value) {
        emailError.value = 'Correo inválido'
    }

    if (!password.value || password.value.length < 6) {
        passwordError.value = 'Mínimo 6 caracteres'
    }

    if (confirmPassword.value !== password.value) {
        confirmPasswordError.value = 'Las contraseñas no coinciden'
    }

    if (
        nameError.value ||
        emailError.value ||
        passwordError.value ||
        confirmPasswordError.value
    ) {
        return
    }

    const registered = authStore.register(name.value, email.value, password.value)

    if (!registered) {
        emailError.value = 'Este correo ya está registrado'
        return
    }

    router.push('/dashboard/perfil')
}
</script>

<template>
    <section class="register-panel">
        <form class="register-form" @submit.prevent="register">

           <div class="register-form-logo">
                <LogoComponent />
            </div>

            <h2>Crea tu cuenta</h2>
            <p>Solo te tomará un minuto.</p>

            <label for="name">Nombre</label>
            <input id="name" v-model="name" type="text" />
            <p v-if="nameError" class="register-form-error">
                {{ nameError }}
            </p>

            <label for="email">Correo electrónico</label>
            <input id="email" v-model="email" type="email" />
            <p v-if="emailError" class="register-form-error">
                {{ emailError }}
            </p>

            <label for="password">Contraseña</label>
            <input id="password" v-model="password" type="password" />
            <p v-if="passwordError" class="register-form-error">
                {{ passwordError }}
            </p>

            <label for="confirm-password">Confirmar contraseña</label>
            <input id="confirm-password" v-model="confirmPassword" type="password" />
            <p v-if="confirmPasswordError" class="register-form-error">
                {{ confirmPasswordError }}
            </p>

            <button type="submit">Crear cuenta</button>

            <p class="register-form-login">¿Ya tienes cuenta?
            <RouterLink to="/login">Inicia sesión</RouterLink>
            </p>
        </form>
    </section>
</template>

<style lang="scss" scoped>
    .register-panel {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 48px;
        background: #f8fafc;
    }

    .register-form {
        width: 100%;
        max-width: 448px;

        &-logo {
            margin-bottom: 24px;
        }

        h2 {
            font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
            font-size: 30px;
            font-weight: 700;
            line-height: 1.2;
            letter-spacing: -.02em;
        }

        p {
            margin-top: 4px;
            margin-bottom: 24px;
            font-size: 14px;
            color: #4b5563;
            line-height: 1.4;
        }

        label:first-of-type {
            margin-top: 0;
        }

        label {
            display: block;
            margin-top: 20px;
            margin-bottom: 10px;
            font-weight: 500;
            font-size: 14px;
        }


        input {
            width: 100%;
            height: 36px;
            padding: 0px 12px;
            border: 1px solid #dde2ea;
            border-radius: 10px;
            background: #f8fafc;
            box-shadow: 0 2px 8px rgba(15, 23, 42, 0.12);
        }

        input:focus {
            outline: none;
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

        p.register-form-login {
            margin-top: 24px;
            text-align: center;

            a {
                color: #7c4dff;
                text-decoration: none;
                font-weight: 500;
            }
        }

        p.register-form-error {
            margin-top: 4px;
            margin-bottom: 0;
            color: #ff0000;
            font-size: 12px;
            line-height: 1.2;
        }
    }
    
    @media (max-width: 1024px) {
        .register-panel {
            min-height: 100vh;
            padding: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .register-form {
            width: 100%;
            max-width: 448px;
        }

        .register-form-logo {
            display: block;
            margin-bottom: 24px;
        }
    }

    @media (max-width: 480px) {
        .register-panel {
            padding: 20px;
            align-items: center;
            justify-content: center;
        }

        .register-form {
            max-width: 100%;
        }
    }
</style>