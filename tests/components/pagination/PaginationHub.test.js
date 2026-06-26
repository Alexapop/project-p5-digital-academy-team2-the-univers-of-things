import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import PaginationHub from '../../../src/components/pagination/PaginationHub.vue'

describe('Test Unitario - PaginationHub de Andrea', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Debería renderizar el componente de paginación correctamente', () => {
    const wrapper = mount(PaginationHub, {
      props: {
        // Le pasamos props típicas por si son obligatorias en tu componente
        currentPage: 1,
        totalPages: 5
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})