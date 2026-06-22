import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const users = ref([
        {
            name: 'Sora Tanaka',
            email: 'user@otakuhub.dev',
            password: 'user1234',
            role: 'customer',
            avatar: '',
            isBlocked: false // 🔥 Grabado a fuego: Estado por defecto
        },
        {
            name: 'Admin Hub',
            email: 'admin@otakuhub.dev',
            password: 'admin123',
            role: 'admin',
            avatar: '',
            isBlocked: false // 🔥 Los admins no suelen empezar bloqueados
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

        // 🧪 TEST DE BLOQUEO: Si está bloqueado, rechazamos el login de inmediato
        if (foundUser.isBlocked) {
            alert('Esta cuenta ha sido bloqueada por el administrador.')
            return false
        }

        currentUser.value = {
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
            avatar: foundUser.avatar,
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

        const newUser = {
            name,
            email,
            password,
            role: 'customer',
            avatar: '',
            isBlocked: false // 🔥 Aseguramos que los nuevos registros empiecen activos
        }

        users.value.push(newUser)

        currentUser.value = {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            avatar: newUser.avatar,
            isAuthenticated: true,
        }

        return currentUser.value
    }

    function updateProfile(newName, newPassword, newAvatar) {
        if (!currentUser.value) return

        const userInList = users.value.find(u => u.email === currentUser.value.email)
        
        if (userInList) {
            if (newName) userInList.name = newName
            if (newPassword) userInList.password = newPassword
            if (newAvatar) userInList.avatar = newAvatar

            currentUser.value.name = userInList.name
            currentUser.value.avatar = userInList.avatar
        }
    }

    // 🔥 NUEVA ACCIÓN PARA EL ADMIN: Bloquear / Desbloquear
    function toggleBlockUser(userIdOrEmail) {
        // Buscamos por email o name ya que tus usuarios estáticos no tienen ID propio aún
        const userInList = users.value.find(u => u.email === userIdOrEmail)
        if (userInList) {
            userInList.isBlocked = !userInList.isBlocked
        }
    }

    // Añadimos toggleBlockUser al return final
    return { users, currentUser, login, register, updateProfile, toggleBlockUser }
})