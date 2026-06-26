import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import DashboardSidebar from '../../../src/components/common/DashboardSidebar.vue'

describe('Test Unitario - DashboardSidebar de Andrea', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Debería renderizar la barra lateral correctamente', () => {
    const wrapper = mount(DashboardSidebar, {
      props: {
        links: [] 
      },
      global: {
        stubs: { 
          RouterLink: true 
        },
        // Usamos mocks para simular las funciones de las rutas directamente
        mocks: {
          $route: { path: '/' },
          $router: { push: () => {} }
        },
        // Esto le da a Vue la inyección exacta que calma el "Symbol(router)"
        provide: {
          'Symbol(router)': {
            currentRoute: { value: { path: '/' } },
            push: () => {}
          }
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})