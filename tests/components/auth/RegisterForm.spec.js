import { describe, expect, test, beforeEach, vi  } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import RegisterForm from '@/components/auth/RegisterForm.vue'

const pushMock = vi.fn()

vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: pushMock
    }),
    RouterLink: {
        template: '<a><slot /></a>'
    }
}))

describe('Register Form', () => {
    let wrapper

    beforeEach(() => {
        localStorage.clear()
        setActivePinia(createPinia())
        pushMock.mockClear()

        wrapper = shallowMount(RegisterForm)
    })

    test('should render register form', () => {
        expect(wrapper.text()).toContain('Crea tu cuenta')
        expect(wrapper.find('input#name').exists()).toBe(true)
        expect(wrapper.find('input#email').exists()).toBe(true)
        expect(wrapper.find('input#password').exists()).toBe(true)
        expect(wrapper.find('input#confirm-password').exists()).toBe(true)
        expect(wrapper.find('button[type="submit"]').text()).toBe('Crear cuenta')
    })

    test('should show validation errors when form is empty', async () => {
        await wrapper.find('form').trigger('submit.prevent')

        expect(wrapper.text()).toContain('Mínimo 2 caracteres')
        expect(wrapper.text()).toContain('Correo inválido')
        expect(wrapper.text()).toContain('Mínimo 6 caracteres')
    })

    test('should show error when passwords do not match', async () => {
        await wrapper.find('input#name').setValue('Usuario Test')
        await wrapper.find('input#email').setValue('usuario@test.com')
        await wrapper.find('input#password').setValue('123456')
        await wrapper.find('input#confirm-password').setValue('654321')

        await wrapper.find('form').trigger('submit.prevent')

        expect(wrapper.text()).toContain('Las contraseñas no coinciden')
    })

    test('should redirect to profile dashboard after successful registration', async () => {
        await wrapper.find('input#name').setValue('Usuario Test')
        await wrapper.find('input#email').setValue('usuario@test.com')
        await wrapper.find('input#password').setValue('123456')
        await wrapper.find('input#confirm-password').setValue('123456')

        await wrapper.find('form').trigger('submit.prevent')

        expect(pushMock).toHaveBeenCalledWith('/dashboard/perfil')
    })

    test('should show error when email is already registered', async () => {
        await wrapper.find('input#name').setValue('Usuario Test')
        await wrapper.find('input#email').setValue('user@otakuhub.dev')
        await wrapper.find('input#password').setValue('123456')
        await wrapper.find('input#confirm-password').setValue('123456')

        await wrapper.find('form').trigger('submit.prevent')

        expect(wrapper.text()).toContain('Este correo ya está registrado')
        expect(pushMock).not.toHaveBeenCalled()
    })
})