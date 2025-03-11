import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import productCard from '../productCard.vue'

describe('productCard', () => {
  it('renders properly', () => {
    const wrapper = mount(productCard, {
      props: {
        name: 'test',
        imageURL: 'test',
        rating: '5',
        reviews: 10,
        country: 'test',
        winery: 'test',
      },
    })
    expect(wrapper.text()).toContain('test')
    expect(wrapper.text()).toContain('5')
    expect(wrapper.text()).toContain('10')
    expect(wrapper.text()).toContain('test')
    expect(wrapper.text()).toContain('test')
  })
})
