/* global it, expect, describe */
import React from 'react'
import Time from '../Time'
import { shallow } from 'enzyme'

describe('Time', () => {
  it('render without crash', () => {
    const el = shallow(<Time />)
    expect(el).toBeTruthy()
  })

  it('render correct format', () => {
    const props = {
      minute: 11,
      second: 22,
      millisecond: 33
    }
    const el = shallow(<Time {...props} />)
    expect(el.text()).toBe('11:22:33')
  })
})
