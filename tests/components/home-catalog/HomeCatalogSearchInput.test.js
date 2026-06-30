import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeCatalogSearchInput from '@/components/home-catalog/HomeCatalogSearchInput.vue'

describe('HomeCatalogSearchInput', () => {
    test('it shows the search field', () => {
        const wrapper = mount(HomeCatalogSearchInput)
        expect(wrapper.find('input').exists()).toBe(true)

    })

    test('it has search type', () => {
        const wrapper = mount(HomeCatalogSearchInput)
        expect(wrapper.find('input').attributes('type')).toBe('search')


    })
    test("it shows the placeholder text", () => {
        const wrapper = mount(HomeCatalogSearchInput)

        expect(wrapper.find('input').attributes('placeholder')).toBe('Buscar anime...')
    })
})



