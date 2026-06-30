import { beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import FeaturedAnime from '@/components/featured/FeaturedAnime.vue'
import AnimeCard from '@/components/card/AnimeCard.vue'
import { useAnimeStore } from '@/stores/animeStore'
import { useAdminStore } from '@/stores/admin'

const featuredAnimes = [
    {
        mal_id: 1,
        title: 'Naruto',
        score: 8.5,
        synopsis: 'Un ninja adolescente...',
        images: {
            jpg: {
                image_url: 'https://example.com/naruto.jpg'
            }
        },
        genres: [{ name: 'Action' }]
    },
    {
        mal_id: 2,
        title: 'One Piece',
        score: 9.0,
        synopsis: 'Un pirata en busca del One Piece...',
        images: {
            jpg: {
                image_url: 'https://example.com/onepiece.jpg'
            }
        },
        genres: [{ name: 'Adventure' }]
    },
    {
        mal_id: 3,
        title: 'Bleach',
        score: 8.0,
        synopsis: 'Un shinigami...',
        images: {
            jpg: {
                image_url: 'https://example.com/bleach.jpg'
            }
        },
        genres: [{ name: 'Action' }]
    },
    {
        mal_id: 4,
        title: 'Attack on Titan',
        score: 9.5,
        synopsis: 'Titanes atacan...',
        images: {
            jpg: {
                image_url: 'https://example.com/aot.jpg'
            }
        },
        genres: [{ name: 'Action' }]
    }
]

const createAnimeStore = (state = {}) => {
    const animeStore = useAnimeStore()

    animeStore.$patch({
        animes: [],
        loading: false,
        error: null,
        ...state
    })

    animeStore.fetchAnimes = vi.fn()

    return animeStore
}

const createAdminStore = (state = {}) => {
    const adminStore = useAdminStore()

    adminStore.$patch({
        featuredAnimes: [],
        ...state
    })

    return adminStore
}

const mountComponent = () => {
    return shallowMount(FeaturedAnime, {
        global: {
            stubs: {
                AnimeCard: true
            }
        }
    })
}

describe('FeaturedAnime', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
    })

    test('it renders the featured title when featured animes exist', () => {
        createAnimeStore()
        createAdminStore({ featuredAnimes })
        const wrapper = mountComponent()

        expect(wrapper.text()).toContain('Featured Anime')
    })

    test('it renders AnimeCard components for each featured anime', () => {
        createAnimeStore()
        createAdminStore({ featuredAnimes })
        const wrapper = mountComponent()

        const animeCards = wrapper.findAllComponents(AnimeCard)
        expect(animeCards).toHaveLength(4)
    })

    test('it passes correct anime prop to each AnimeCard', () => {
        createAnimeStore()
        createAdminStore({ featuredAnimes })
        const wrapper = mountComponent()

        const animeCards = wrapper.findAllComponents(AnimeCard)
        expect(animeCards[0].props('anime')).toEqual(featuredAnimes[0])
        expect(animeCards[1].props('anime')).toEqual(featuredAnimes[1])
        expect(animeCards[2].props('anime')).toEqual(featuredAnimes[2])
        expect(animeCards[3].props('anime')).toEqual(featuredAnimes[3])
    })

    test('it shows loading message when animeStore is loading and no featured animes', () => {
        createAnimeStore({ loading: true })
        createAdminStore({ featuredAnimes: [] })
        const wrapper = mountComponent()

        expect(wrapper.text()).toContain('Cargando destacados...')
        expect(wrapper.text()).not.toContain('Featured Anime')
    })

    test('it shows empty message when no featured animes and not loading', () => {
        createAnimeStore({ loading: false })
        createAdminStore({ featuredAnimes: [] })
        const wrapper = mountComponent()

        expect(wrapper.text()).toContain('No hay ningún anime destacado seleccionado en el panel de administración.')
    })

    test('it calls fetchAnimes on mount when animes array is empty', () => {
        const animeStore = createAnimeStore({ animes: [] })
        createAdminStore()

        mountComponent()

        expect(animeStore.fetchAnimes).toHaveBeenCalled()
    })

    test('it calls fetchAnimes on mount when animes is null', () => {
        const animeStore = createAnimeStore({ animes: null })
        createAdminStore()

        mountComponent()

        expect(animeStore.fetchAnimes).toHaveBeenCalled()
    })

    test('it does not call fetchAnimes when animes array has items', () => {
        const animeStore = createAnimeStore({ animes: [{ mal_id: 1, title: 'Test' }] })
        createAdminStore()

        mountComponent()

        expect(animeStore.fetchAnimes).not.toHaveBeenCalled()
    })

    test('it does not render AnimeCard when featuredAnimes is empty', () => {
        createAnimeStore()
        createAdminStore({ featuredAnimes: [] })
        const wrapper = mountComponent()

        expect(wrapper.findAllComponents(AnimeCard)).toHaveLength(0)
    })

    test('it prioritizes featuredAnimes over loading state', () => {
        createAnimeStore({ loading: true })
        createAdminStore({ featuredAnimes })
        const wrapper = mountComponent()

        expect(wrapper.text()).toContain('Featured Anime')
        expect(wrapper.text()).not.toContain('Cargando destacados...')
        expect(wrapper.findAllComponents(AnimeCard)).toHaveLength(4)
    })
})