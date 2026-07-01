import { describe, expect, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import FooterComponent from '@/components/footer/FooterComponent.vue'
import LogoComponent from '@/components/logo/LogoComponent.vue'

describe('Footer Component', () => {
    test('should render the footer', () => {
        const wrapper = shallowMount(FooterComponent)

        expect(wrapper.find('footer').exists()).toBe(true)
        expect(wrapper.find('.footer').exists()).toBe(true)
    })

    test('should render the logo component', () => {
        const wrapper = shallowMount(FooterComponent)

        expect(wrapper.findComponent(LogoComponent).exists()).toBe(true)
    })

    test('should render the footer description', () => {
        const wrapper = shallowMount(FooterComponent)

        expect(wrapper.text()).toContain('Tu biblioteca personal de anime')
    })

    test('should render social links', () => {
        const wrapper = shallowMount(FooterComponent)

        expect(wrapper.find('a[aria-label="Twitter"]').exists()).toBe(true)
        expect(wrapper.find('a[aria-label="Instagram"]').exists()).toBe(true)
        expect(wrapper.find('a[aria-label="YouTube"]').exists()).toBe(true)
    })

    test('should render copyright text', () => {
        const wrapper = shallowMount(FooterComponent)

        expect(wrapper.text()).toContain('2026 OtakuHub')
        expect(wrapper.text()).toContain('Todos Los Derechos Reservados')
    })
})