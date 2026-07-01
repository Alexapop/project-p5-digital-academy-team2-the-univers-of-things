import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import AdminUsersTable from '../../../src/components/admin/AdminUsersTable.vue'

// Mockeamos la store de Pinia directamente antes de que se use
vi.mock('@/stores/auth', () => { // Ajusta esta ruta si tu useAuthStore() viene de otro sitio
  return {
    useAuthStore: () => ({
      // Simula aquí el estado o funciones que use tu componente, por ejemplo:
      user: { name: 'Andrea', role: 'admin' },
      isLoggedIn: true
    })
  }
})

// Por si acaso la importas desde 'pinia' directamente en el componente de otra forma
vi.mock('pinia', () => ({
  useAuthStore: () => ({
    user: { name: 'Andrea', role: 'admin' }
  }),
  setActivePinia: vi.fn(),
  createPinia: vi.fn()
}))

describe('UTE2-15: Test Unitario - Panel de Administración de Andrea', () => {
  it('Debería montar la tabla de gestión de usuarios sin errores', () => {
    const wrapper = mount(AdminUsersTable, {
      global: {
        // Proveemos un objeto vacío simulando que Pinia está ahí de forma básica
        provide: {
          store: {} 
        }
      }
    })
    
    expect(wrapper.exists()).toBe(true)
  })
})