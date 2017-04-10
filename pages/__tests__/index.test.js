/* global it, expect, describe */
import React from 'react'
import CubeTimer from '../index'
import Page from '../../components/Page'
import { Provider } from 'mobx-react'
import { shallow } from 'enzyme'

describe('CubeTimer', () => {
  it('render without crash', () => {
    const el = shallow(<CubeTimer />)
    expect(el).toBeTruthy()
  })

  it('render Page and Provider', () => {
    const el = shallow(<CubeTimer />)
    expect(el.find(Provider).length).toBe(1)
    expect(el.find(Page).length).toBe(1)
  })
})
