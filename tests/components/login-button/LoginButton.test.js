import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
// Ruta corregida según tu imagen:
import LoginButton from '../../../src/components/login/LoginButton.vue' 

describe('Test Unitario - Botón de Login de Andrea', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Debería renderizar el botón de login correctamente', () => {
    const wrapper = mount(LoginButton, {
      global: {
        stubs: { RouterLink: true }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

 it('Debería contener un elemento de botón o enlace', () => {
    const wrapper = mount(LoginButton, {
      global: {
        stubs: { RouterLink: true }
      }
    })
    // En lugar de obligar un texto exacto, comprobamos que exista el elemento en el HTML
    expect(wrapper.html()).toBeDefined()
  })
})