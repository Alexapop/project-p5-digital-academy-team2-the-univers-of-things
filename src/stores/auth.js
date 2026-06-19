import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const users = ref([
        {
            name: 'Sora Tanaka', // Le añadimos el nombre por defecto aquí
            email: 'user@otakuhub.dev',
            password: 'user1234',
            role: 'customer',
            avatar: '' // Dejamos el espacio para el avatar
        },
        {
            name: 'Admin Hub',
            email: 'admin@otakuhub.dev',
            password: 'admin123',
            role: 'admin',
            avatar: ''
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

        // Ahora guardamos TODOS los datos del usuario en la sesión, no solo el email
        currentUser.value = {
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
            avatar: foundUser.avatar,
            isAuthenticated: true,
        }

        return currentUser.value
    }

    // 🔥 ESTA ES LA FUNCIÓN NUEVA QUE TENÉIS QUE AÑADIR 🔥
    function updateProfile(newName, newPassword, newAvatar) {
        if (!currentUser.value) return

        // 1. Buscamos al usuario real dentro de la lista 'users' por su email
        const userInList = users.value.find(u => u.email === currentUser.value.email)
        
        if (userInList) {
            // 2. Actualizamos sus datos en la lista global (para cuando vuelva a iniciar sesión)
            if (newName) userInList.name = newName
            if (newPassword) userInList.password = newPassword
            if (newAvatar) userInList.avatar = newAvatar

            // 3. Actualizamos también la sesión activa al momento para que el Sidebar cambie en vivo
            currentUser.value.name = userInList.name
            currentUser.value.avatar = userInList.avatar
        }
    }

    // Acuérdate de añadir 'updateProfile' al return al final del archivo
    return { users, currentUser, login, updateProfile }
})