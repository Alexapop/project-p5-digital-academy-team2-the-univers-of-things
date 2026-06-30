import { describe, expect, test, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useAuthStore } from '@/stores/auth'

describe('Auth Store', () => {
    beforeEach(() => {
        localStorage.clear()
        setActivePinia(createPinia())
        vi.restoreAllMocks()
        vi.spyOn(window, 'alert').mockImplementation(() => {})
    })

    test('should have initial customer and admin users', () => {
        const authStore = useAuthStore()

        expect(authStore.users).toHaveLength(2)
        expect(authStore.users[0].email).toBe('user@otakuhub.dev')
        expect(authStore.users[0].role).toBe('customer')
        expect(authStore.users[1].email).toBe('admin@otakuhub.dev')
        expect(authStore.users[1].role).toBe('admin')
    })

    test('should login an existing customer user', () => {
        const authStore = useAuthStore()

        const user = authStore.login('user@otakuhub.dev', 'user1234')

        expect(user).toBeTruthy()
        expect(authStore.currentUser.email).toBe('user@otakuhub.dev')
        expect(authStore.currentUser.role).toBe('customer')
        expect(authStore.currentUser.isAuthenticated).toBe(true)

        const savedUser = JSON.parse(localStorage.getItem('otakuhub_current_user'))
        expect(savedUser.email).toBe('user@otakuhub.dev')
    })

    test('should not login with wrong credentials', () => {
        const authStore = useAuthStore()

        const user = authStore.login('wrong@email.com', 'wrongpass')

        expect(user).toBe(false)
        expect(authStore.currentUser).toBe(null)
        expect(localStorage.getItem('otakuhub_current_user')).toBe(null)
    })

    test('should not login blocked user', () => {
        const authStore = useAuthStore()

        authStore.toggleBlockUser('user@otakuhub.dev')

        const user = authStore.login('user@otakuhub.dev', 'user1234')

        expect(user).toBe(false)
        expect(authStore.currentUser).toBe(null)
        expect(window.alert).toHaveBeenCalledWith('Esta cuenta ha sido bloqueada por el administrador.')
    })

    test('should register a new customer user', () => {
        const authStore = useAuthStore()

        const user = authStore.register('Usuario Test', 'usuario@test.com', '123456')

        expect(user).toBeTruthy()
        expect(authStore.currentUser.email).toBe('usuario@test.com')
        expect(authStore.currentUser.role).toBe('customer')
        expect(authStore.currentUser.isAuthenticated).toBe(true)

        const createdUser = authStore.users.find(user => user.email === 'usuario@test.com')

        expect(createdUser).toBeTruthy()
        expect(createdUser.name).toBe('Usuario Test')
        expect(createdUser.role).toBe('customer')

        const savedUsers = JSON.parse(localStorage.getItem('otakuhub_users'))

        expect(savedUsers.some(user => user.email === 'usuario@test.com')).toBe(true)
    })

    test('should not register user with existing email',() => {
        const authStore = useAuthStore()

        const result = authStore.register('Usuario Test', 'user@otakuhub.dev', '123456')
        expect(result).toBe(false)
        expect(window.alert).toHaveBeenCalledWith('El correo ya está registrado.')

        const usersWithSameEmail = authStore.users.filter(user => user.email === 'user@otakuhub.dev')
        expect(usersWithSameEmail).toHaveLength(1)
    })
})