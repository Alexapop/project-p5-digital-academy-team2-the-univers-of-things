import { describe, expect, test, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import HeaderComponent from '@/components/header/HeaderComponent.vue'
import LogoComponent from '@/components/logo/LogoComponent.vue'
import LoginButton from '@/components/login/LoginButton.vue'
import RegisterButton from '@/components/register/RegisterButton.vue'
import { useAuthStore } from '@/stores/auth'

const pushMock = vi.fn()
let routePath = '/'

vi.mock('vue-router', () => ({
    useRoute: () => ({
        path: routePath
    }),
    useRouter: () => ({
        push: pushMock
    }),
    RouterLink: {
        name: 'RouterLink',
        props: ['to'],
        template: '<a><slot /></a>'
    }
}))

describe('Header Component', () => {
    beforeEach(() => {
        localStorage.clear()
        setActivePinia(createPinia())
        pushMock.mockClear()
        routePath = '/'
    })

    test('should render the header and logo', () => {
        const wrapper = shallowMount(HeaderComponent)

        expect(wrapper.find('header').exists()).toBe(true)
        expect(wrapper.find('.header').exists()).toBe(true)
        expect(wrapper.findComponent(LogoComponent).exists()).toBe(true)
    })

    test('should show login and register buttons when user is not logged in', () => {
        const wrapper = shallowMount(HeaderComponent)

        expect(wrapper.findComponent(LoginButton).exists()).toBe(true)
        expect(wrapper.findComponent(RegisterButton).exists()).toBe(true)
    })

    test('should show dashboard and logout buttons when customer is logged in', () => {
        const authStore = useAuthStore()

        authStore.login('user@otakuhub.dev', 'user1234')

        const wrapper = shallowMount(HeaderComponent)

        expect(wrapper.text()).toContain('Dashboard')
        expect(wrapper.text()).toContain('Salir')
    })

    test('should link customer dashboard button to favorites dashboard', () => {
        const authStore = useAuthStore()

        authStore.login('user@otakuhub.dev', 'user1234')

        const wrapper = shallowMount(HeaderComponent)
        const dashboardLink = wrapper.find('.btn-dashboard')

        expect(dashboardLink.exists()).toBe(true)
        expect(dashboardLink.attributes('to')).toBe('/dashboard/favoritos')
    })

    test('should show back home and logout buttons inside dashboard pages', () => {
        const authStore = useAuthStore()
        routePath = '/dashboard/perfil'

        authStore.login('user@otakuhub.dev', 'user1234')

        const wrapper = shallowMount(HeaderComponent)

        expect(wrapper.text()).toContain('← Volver al sitio')
        expect(wrapper.text()).toContain('Salir')
    })

    test('should logout user and redirect to home', async () => {
        const authStore = useAuthStore()

        authStore.login('user@otakuhub.dev', 'user1234')

        const wrapper = shallowMount(HeaderComponent)

        await wrapper.find('.btn-logout').trigger('click')

        expect(authStore.currentUser).toBe(null)
        expect(pushMock).toHaveBeenCalledWith('/')
    })
})