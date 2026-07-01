import { beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AnimeCard from '@/components/card/AnimeCard.vue'
import FavoriteButton from '@/components/card/FavoriteButton.vue'

const anime = {
    mal_id: 1,
    title: 'Naruto',
    score: 8.5,
    synopsis: 'Un ninja adolescente llamado Naruto Uzumaki...',
    images: {
        jpg: {
            image_url: 'https://example.com/naruto.jpg'
        }
    },
    genres: [
        { name: 'Action' },
        { name: 'Adventure' },
        { name: 'Fantasy' },
        { name: 'Comedy' }
    ]
}

const mountComponent = (props = {}) => {
    return shallowMount(AnimeCard, {
        props: {
            anime,
            ...props
        },
        global: {
            stubs: {
                RouterLink: RouterLinkStub,
                FavoriteButton: true
            }
        }
    })
}

describe('AnimeCard', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
    })

    test('it renders the anime title', () => {
        const wrapper = mountComponent()

        expect(wrapper.text()).toContain('Naruto')
    })

    test('it renders the anime score', () => {
        const wrapper = mountComponent()

        expect(wrapper.text()).toContain('⭐ 8.5')
    })

    test('it renders the anime synopsis', () => {
        const wrapper = mountComponent()

        expect(wrapper.text()).toContain('Un ninja adolescente llamado Naruto Uzumaki...')
    })

    test('it renders the anime image from images.jpg.image_url', () => {
        const wrapper = mountComponent()

        const img = wrapper.find('img')
        expect(img.attributes('src')).toBe('https://example.com/naruto.jpg')
    })

    test('it renders a placeholder when no image url is available', () => {
        const animeNoImage = { ...anime, images: null, image_url: null }
        const wrapper = mountComponent({ anime: animeNoImage })

        const img = wrapper.find('img')
        expect(img.attributes('src')).toBe('https://via.placeholder.com/260x400?text=No+Image')
    })

    test('it renders "Sin título" when anime has no title', () => {
        const animeNoTitle = { ...anime, title: null }
        const wrapper = mountComponent({ anime: animeNoTitle })

        expect(wrapper.text()).toContain('Sin título')
    })

    test('it renders "N/A" when anime has no score', () => {
        const animeNoScore = { ...anime, score: null }
        const wrapper = mountComponent({ anime: animeNoScore })

        expect(wrapper.text()).toContain('⭐ N/A')
    })

    test('it renders "Sin sinopsis disponible." when anime has no synopsis', () => {
        const animeNoSynopsis = { ...anime, synopsis: null }
        const wrapper = mountComponent({ anime: animeNoSynopsis })

        expect(wrapper.text()).toContain('Sin sinopsis disponible.')
    })

    test('it displays maximum 3 genres', () => {
        const wrapper = mountComponent()

        const genreItems = wrapper.findAll('li')
        expect(genreItems).toHaveLength(3)
        expect(genreItems[0].text()).toBe('Action')
        expect(genreItems[1].text()).toBe('Adventure')
        expect(genreItems[2].text()).toBe('Fantasy')
    })

    test('it returns empty array when genres is null', () => {
        const animeNoGenres = { ...anime, genres: null }
        const wrapper = mountComponent({ anime: animeNoGenres })

        const genreItems = wrapper.findAll('li')
        expect(genreItems).toHaveLength(0)
    })

    test('it includes a router-link to the anime detail page', () => {
        const wrapper = mountComponent()

        const routerLink = wrapper.findComponent(RouterLinkStub)
        expect(routerLink.props('to')).toBe('/anime/1')
        expect(routerLink.text()).toBe('See more')
    })

    test('it renders the FavoriteButton with anime prop', () => {
        const wrapper = mountComponent()

        const favoriteButton = wrapper.findComponent(FavoriteButton)
        expect(favoriteButton.exists()).toBe(true)
        expect(favoriteButton.props('anime')).toEqual(anime)
    })

    test('it renders the image alt attribute', () => {
        const wrapper = mountComponent()

        const img = wrapper.find('img')
        expect(img.attributes('alt')).toBe('Anime Poster')
    })
})