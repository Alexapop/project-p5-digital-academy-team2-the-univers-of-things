import { beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import FavoriteButton from '@/components/card/FavoriteButton.vue'
import { useAuthStore } from '@/stores/auth'

const anime = {
    mal_id: 1,
    title: 'Naruto',
    score: 8.5,
    images: {
        jpg: {
            image_url: 'https://example.com/naruto.jpg'
        }
    }
}

const createAuthStore = (state = {}) => {
    const authStore = useAuthStore()

    authStore.$patch({
        currentUser: null,
        favorites: [],
        ...state
    })

    authStore.addFavorite = vi.fn()
    authStore.isFavorite = vi.fn()

    return authStore
}

const mountComponent = (props = {}) => {
    return shallowMount(FavoriteButton, {
        props: {
            anime,
            ...props
        }
    })
}

describe('FavoriteButton', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
    })

    test('it renders a button', () => {
        createAuthStore()
        const wrapper = mountComponent()

        expect(wrapper.find('button').exists()).toBe(true)
    })

    test('it shows alert when user is not logged in', () => {
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
        const authStore = createAuthStore({ currentUser: null })
        authStore.isFavorite.mockReturnValue(false)
        
        const wrapper = mountComponent()
        wrapper.find('button').trigger('click')

        expect(alertMock).toHaveBeenCalledWith('Inicia sesión para añadir favoritos')
        expect(authStore.addFavorite).not.toHaveBeenCalled()
        
        alertMock.mockRestore()
    })

    test('it calls addFavorite when user is logged in', () => {
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
        const authStore = createAuthStore({ currentUser: { id: 1, name: 'Test User' } })
        authStore.addFavorite.mockReturnValue({ message: 'Añadido a favoritos' })
        authStore.isFavorite.mockReturnValue(false)
        
        const wrapper = mountComponent()
        wrapper.find('button').trigger('click')

        expect(authStore.addFavorite).toHaveBeenCalledWith(anime)
        expect(alertMock).toHaveBeenCalledWith('Añadido a favoritos')
        
        alertMock.mockRestore()
    })

    test('it shows filled heart when anime is in favorites', () => {
        const authStore = createAuthStore()
        authStore.isFavorite.mockReturnValue(true)
        
        const wrapper = mountComponent()

        const svg = wrapper.find('svg')
        expect(svg.attributes('fill')).toBe('#ff4757')
    })

    test('it shows currentColor heart when anime is not in favorites', () => {
        const authStore = createAuthStore()
        authStore.isFavorite.mockReturnValue(false)
        
        const wrapper = mountComponent()

        const svg = wrapper.find('svg')
        expect(svg.attributes('fill')).toBe('currentColor')
    })

    test('it shows correct title when anime is in favorites', () => {
        const authStore = createAuthStore()
        authStore.isFavorite.mockReturnValue(true)
        
        const wrapper = mountComponent()

        expect(wrapper.find('button').attributes('title')).toBe('Ya está en favoritos')
    })

    test('it shows correct title when anime is not in favorites', () => {
        const authStore = createAuthStore()
        authStore.isFavorite.mockReturnValue(false)
        
        const wrapper = mountComponent()

        expect(wrapper.find('button').attributes('title')).toBe('Añadir a favoritos')
    })

    test('it calls isFavorite with anime mal_id', () => {
        const authStore = createAuthStore()
        authStore.isFavorite.mockReturnValue(false)
        
        mountComponent()

        expect(authStore.isFavorite).toHaveBeenCalledWith(anime.mal_id)
    })

    test('it handles addFavorite result message correctly', () => {
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
        const authStore = createAuthStore({ currentUser: { id: 1 } })
        authStore.addFavorite.mockReturnValue({ message: 'Eliminado de favoritos' })
        authStore.isFavorite.mockReturnValue(true)
        
        const wrapper = mountComponent()
        wrapper.find('button').trigger('click')

        expect(alertMock).toHaveBeenCalledWith('Eliminado de favoritos')
        
        alertMock.mockRestore()
    })

    test('it uses optional chaining for anime mal_id', () => {
        const authStore = createAuthStore()
        const animeNoId = { title: 'No ID Anime', mal_id: null }
        
        mountComponent({ anime: animeNoId })

        expect(authStore.isFavorite).toHaveBeenCalledWith(null)
    })
})