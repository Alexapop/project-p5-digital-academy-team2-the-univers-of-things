import { describe, expect, test, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import LoginForm from '@/components/auth/LoginForm.vue'

const pushMock = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock
  }),
  useRoute: () => ({
    query: {}
  }),
  RouterLink: {
    template: '<a><slot /></a>'
  }
}))

describe('Login Form', () => {
  let wrapper

  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
    pushMock.mockClear()

    wrapper = shallowMount(LoginForm)
  })

    test('should render login form', () => {
        expect(wrapper.text()).toContain('Bienvenido de vuelta')
        expect(wrapper.find('input[type="email"]').exists()).toBe(true)
        expect(wrapper.find('input[type="password"]').exists()).toBe(true)
        expect(wrapper.find('button[type="submit"]').text()).toBe('Entrar')
    })

    test('should show validation errors when form is empty', async () => {
        await wrapper.find('form').trigger('submit.prevent')

        expect(wrapper.text()).toContain('Correo inválido')
        expect(wrapper.text()).toContain('Mínimo 6 caracteres')
    })

    test('should show error with wrong credentials', async () => {
        await wrapper.find('input[type="email"]').setValue('wrong@email.com')
        await wrapper.find('input[type="password"]').setValue('wrongpass')

        await wrapper.find('form').trigger('submit.prevent')

        expect(wrapper.text()).toContain('Credenciales incorrectas')
    })

    test('should redirect customer to profile dashboard after successful login', async () => {
        await wrapper.find('input[type="email"]').setValue('user@otakuhub.dev')
        await wrapper.find('input[type="password"]').setValue('user1234')

        await wrapper.find('form').trigger('submit.prevent')

        expect(pushMock).toHaveBeenCalledWith('/dashboard/perfil')
    })

    test('should redirect admin to users admin page after successful login', async () => {
        await wrapper.find('input[type="email"]').setValue('admin@otakuhub.dev')
        await wrapper.find('input[type="password"]').setValue('admin123')

        await wrapper.find('form').trigger('submit.prevent')

        expect(pushMock).toHaveBeenCalledWith('/admin/usuarios')
    })
})