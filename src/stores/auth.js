import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(
        {
        email: 'user@otakuhub.dev',
        password: 'user1234',
        isAuthenticated: false,
        }
    )

    function login(email, password) {
        if (email === user.value.email && password === user.value.password) {
            user.value.isAuthenticated = true
            return true
        }

        return false
    }
    return { user, login }
})