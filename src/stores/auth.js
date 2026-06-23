import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const initialUsers = [
        {
            name: 'Sora Tanaka',
            email: 'user@otakuhub.dev',
            password: 'user1234',
            role: 'customer',
            avatar: '',
            isBlocked: false
        },
        {
            name: 'Admin Hub',
            email: 'admin@otakuhub.dev',
            password: 'admin123',
            role: 'admin',
            avatar: '',
            isBlocked: false
        }
    ]

    const users = ref(JSON.parse(localStorage.getItem('otakuhub_users')) || initialUsers)
    const currentUser = ref(JSON.parse(localStorage.getItem('otakuhub_current_user')) || null)
    const favorites = ref([])

    function saveUsersToStorage() {
        localStorage.setItem('otakuhub_users', JSON.stringify(users.value))
    }

    const loadFavorites = () => {
        const saved = localStorage.getItem('userFavorites')
        if (saved) {
            favorites.value = JSON.parse(saved)
        }
    }

    const saveFavorites = () => {
        localStorage.setItem('userFavorites', JSON.stringify(favorites.value))
    }

    function login(email, password) {
        const foundUser = users.value.find((user) => user.email === email && user.password === password)

        if (!foundUser) return false

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
        
        localStorage.setItem('otakuhub_current_user', JSON.stringify(currentUser.value))
        loadFavorites()
        return currentUser.value
    }

    function register(name, email, password) {
        const userExists = users.value.some((user) => user.email === email)

        if (userExists) {
            alert('El correo ya está registrado.')
            return false
        }

        const newUser = {
            name,
            email,
            password,
            role: 'customer',
            avatar: '',
            isBlocked: false 
        }

        users.value.push(newUser)
        saveUsersToStorage()

        currentUser.value = {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            avatar: newUser.avatar,
            isAuthenticated: true,
        }
        localStorage.setItem('otakuhub_current_user', JSON.stringify(currentUser.value))
        
        favorites.value = []
        saveFavorites()

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

            saveUsersToStorage()
            localStorage.setItem('otakuhub_current_user', JSON.stringify(currentUser.value))
        }
    }

    function toggleBlockUser(email) {
        const userInList = users.value.find(u => u.email === email)
        if (userInList) {
            userInList.isBlocked = !userInList.isBlocked
            saveUsersToStorage()
        }
    }

    // FUNCIONES DE FAVORITOS
    
    function addFavorite(animeData) {
        const exists = favorites.value.find(fav => fav.mal_id === animeData.mal_id)
        if (exists) return { success: false, message: 'Este anime ya está en tus favoritos' }
        
        favorites.value.push({
            id: Date.now(),
            mal_id: animeData.mal_id,
            title: animeData.title,
            content: animeData.synopsis || animeData.content || 'Sin descripción disponible.',
            image_url: animeData.images?.jpg?.image_url || animeData.image_url || '',
            score: animeData.score || 0,
            rating: animeData.rating || 0,
            editing: false
        })
        
        saveFavorites()
        return { success: true, message: 'Añadido a favoritos correctamente' }
    }

    function removeFavorite(id) {
        favorites.value = favorites.value.filter(fav => fav.id !== id)
        saveFavorites()
    }

    function updateFavorite(id, data) {
        const index = favorites.value.findIndex(fav => fav.id === id)
        if (index !== -1) {
            favorites.value[index] = { ...favorites.value[index], ...data }
            saveFavorites()
        }
    }

    function isFavorite(malId) {
        return favorites.value.some(fav => fav.mal_id === malId)
    }

    // 🔥 LOGOUT CORREGIDO: Limpia el estado interno de la store y los favoritos en memoria
    function logout() {
        currentUser.value = null
        favorites.value = []
        localStorage.removeItem('otakuhub_current_user')
        localStorage.removeItem('userFavorites')
    }

    loadFavorites()

    // 📦 REUNIDO Y AHORA SÍ INCLUYENDO EL LOGOUT EXTERNO
    return { 
        users, 
        currentUser, 
        favorites,
        login, 
        register, 
        updateProfile,
        toggleBlockUser,
        logout, // <--- 🔥 ¡ESTO ERA LO QUE FALTABA EXPORTAR!
        addFavorite,
        removeFavorite,
        updateFavorite,
        isFavorite
    }
})