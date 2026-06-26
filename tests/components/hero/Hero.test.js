import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import Hero from '../../../src/components/hero/HeroSection.vue'

describe('Test Unitario - Componente Hero de Andrea', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Debería renderizar el componente Hero correctamente', () => {
    const wrapper = mount(Hero, {
      global: {
        stubs: {
          // Simulamos el RouterLink para que Vue Router no explote al buscar 'resolve'
          RouterLink: true 
        }
      }
    })
    
    expect(wrapper.exists()).toBe(true)
  })

  it('Debería mostrar el título principal del universo anime', () => {
    const wrapper = mount(Hero, {
      global: {
        stubs: {
          RouterLink: true
        }
      }
    })
    
    const titulo = wrapper.find('h1')
    expect(titulo.text()).toContain('universo anime')
  })
})