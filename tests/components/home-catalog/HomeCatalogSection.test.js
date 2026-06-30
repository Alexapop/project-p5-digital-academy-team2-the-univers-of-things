import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import HomeCatalogSection from '@/components/home-catalog/HomeCatalogSection.vue'
import HomeCatalogSearchInput from '@/components/home-catalog/HomeCatalogSearchInput.vue'
import HomeCatalogGenreFilter from '@/components/home-catalog/HomeCatalogGenreFilter.vue'
import PaginationHub from '@/components/pagination/PaginationHub.vue'
import AnimeCard from '@/components/card/AnimeCard.vue'
import { useAnimeStore } from '@/stores/animeStore'

const animes = [
    {
        mal_id: 1,
        title: 'Naruto',
        genres: [{ name: 'Action' }],
        explicit_genres: [],
        themes: [],
        demographics: []
    },
    {
        mal_id: 2,
        title: 'One Piece',
        genres: [{ name: 'Comedy' }],
        explicit_genres: [],
        themes: [],
        demographics: []
    }
]

const createAnimeStore = (state = {}) => {
    const animeStore = useAnimeStore()

    animeStore.$patch({
        animes,
        loading: false,
        error: null,
        currentPage: 1,
        totalPagesFromApi: 1,
        ...state
    })

    animeStore.fetchAnimes = vi.fn()

    return animeStore
}

const mountComponent = () => {
    return shallowMount(HomeCatalogSection)
}

describe('HomeCatalogSection', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        localStorage.clear()
        vi.clearAllMocks()
    })

    test('it shows the catalog title and filters', () => {
        createAnimeStore()
        const wrapper = mountComponent()

        expect(wrapper.text()).toContain('General')
        expect(wrapper.text()).toContain('Filtra')
        expect(wrapper.findComponent(HomeCatalogSearchInput).exists()).toBe(true)
        expect(wrapper.findComponent(HomeCatalogGenreFilter).exists()).toBe(true)
    })

    test('it calls fetchAnimes when anime list is empty', () => {
        const animeStore = createAnimeStore({ animes: [] })

        mountComponent()

        expect(animeStore.fetchAnimes).toHaveBeenCalled()
    })

    test('it does not call fetchAnimes when anime list has items', () => {
        const animeStore = createAnimeStore()

        mountComponent()

        expect(animeStore.fetchAnimes).not.toHaveBeenCalled()
    })

    test('it shows loading message when catalog is loading', () => {
        createAnimeStore({ loading: true })
        const wrapper = mountComponent()

        expect(wrapper.text()).toContain('Cargando animes')
    })

    test('it shows the store error message', () => {
        createAnimeStore({ error: 'Error al cargar los animes' })
        const wrapper = mountComponent()

        expect(wrapper.text()).toContain('Error al cargar los animes')
    })

    test('it shows anime card stubs and pagination by default', () => {
        createAnimeStore()
        const wrapper = mountComponent()

        expect(wrapper.findAllComponents(AnimeCard)).toHaveLength(2)
        expect(wrapper.findComponent(PaginationHub).exists()).toBe(true)
    })

    test('it filters anime cards by search text', async () => {
        createAnimeStore()
        const wrapper = mountComponent()

        wrapper.findComponent(HomeCatalogSearchInput).vm.$emit('update:modelValue', 'Naruto')
        await nextTick()

        const animeCards = wrapper.findAllComponents(AnimeCard)

        expect(animeCards).toHaveLength(1)
        expect(animeCards[0].props('anime').title).toBe('Naruto')
        expect(wrapper.findComponent(PaginationHub).exists()).toBe(false)
    })

    test('it filters anime cards by selected genre', async () => {
        createAnimeStore()
        const wrapper = mountComponent()

        wrapper.findComponent(HomeCatalogGenreFilter).vm.$emit('update:modelValue', 'Comedy')
        await nextTick()

        const animeCards = wrapper.findAllComponents(AnimeCard)

        expect(animeCards).toHaveLength(1)
        expect(animeCards[0].props('anime').title).toBe('One Piece')
    })

    test('it shows an error when search text has invalid characters', async () => {
        createAnimeStore()
        const wrapper = mountComponent()

        wrapper.findComponent(HomeCatalogSearchInput).vm.$emit('update:modelValue', '123')
        await nextTick()

        expect(wrapper.text()).toContain('Por favor, introduce solo letras.')
        expect(wrapper.findAllComponents(AnimeCard)).toHaveLength(0)
    })

    test('it shows no results message when filters do not match any anime', async () => {
        createAnimeStore()
        const wrapper = mountComponent()

        wrapper.findComponent(HomeCatalogSearchInput).vm.$emit('update:modelValue', 'Bleach')
        await nextTick()

        expect(wrapper.text()).toContain('No tenemos anime disponible con estos filtros.')
        expect(wrapper.findAllComponents(AnimeCard)).toHaveLength(0)
    })
})
