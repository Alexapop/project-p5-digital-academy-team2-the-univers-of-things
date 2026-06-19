import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const users = ref([
        {
            email: 'user@otakuhub.dev',
            password: 'user1234',
            role: 'customer',
        },
        {
            email: 'admin@otakuhub.dev',
            password: 'admin123',
            role: 'admin',
        },
    ])

    const currentUser = ref(null)

    function login(email, password) {
        const foundUser = users.value.find((user) => {
            return user.email === email && user.password === password
        })

        if (!foundUser) {
            return false
        }

        currentUser.value = {
            email: foundUser.email,
            role: foundUser.role,
            isAuthenticated: true,
        }

        return currentUser.value
    }

    function register(name, email, password) {
        const userExists = users.value.some((user) => {
            return user.email === email
        })

        if (userExists) {
            return false
        }

        users.value.push({
            name,
            email,
            password,
            role: 'customer',
            avatar: '',
        })

        return true
    }
    
    return { users, currentUser, login, register }
})