import { describe, expect, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import LogoComponent from '@/components/logo/LogoComponent.vue'

describe('Logo Component', () => {
    test('should render the logo text', () => {
        const wrapper = shallowMount(LogoComponent, {
            global: {
                stubs: {
                    RouterLink: {
                        name: 'RouterLink',
                        props: ['to'],
                        template: '<a><slot /></a>'
                    }
                }
            }
        })

        expect(wrapper.text()).toContain('OtakuHub')
    })

    test('should render a link to home page', () => {
        const wrapper = shallowMount(LogoComponent, {
            global: {
                stubs: {
                    RouterLink: {
                        name: 'RouterLink',
                        props: ['to'],
                        template: '<a><slot /></a>'
                    }
                }
            }
        })

        const link = wrapper.findComponent({ name: 'RouterLink' })

        expect(link.exists()).toBe(true)
        expect(link.props('to')).toBe('/')
    })

    test('should render the logo icon', () => {
        const wrapper = shallowMount(LogoComponent, {
            global: {
                stubs: {
                    RouterLink: {
                        name: 'RouterLink',
                        props: ['to'],
                        template: '<a><slot /></a>'
                    }
                }
            }
        })

        expect(wrapper.find('.logo-icon').exists()).toBe(true)
        expect(wrapper.find('svg').exists()).toBe(true)
    })
})