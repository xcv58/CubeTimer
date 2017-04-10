/* global it, expect, describe */
import React from 'react'
import Page from '../Page'
import StopWatch from '../StopWatch'
import { shallow } from 'enzyme'

describe('Page', () => {
  it('has onKeyDown, onKeyUp, onTouchStart, onTouchEnd', () => {
    const store = { isServer: false }
    const el = shallow(<Page store={store} />)
    const instance = el.instance()
    expect(typeof instance.onKeyDown).toBe('function')
    expect(typeof instance.onKeyUp).toBe('function')
    expect(typeof instance.onTouchStart).toBe('function')
    expect(typeof instance.onTouchEnd).toBe('function')
  })

  it('honor isServer', () => {
    const store = { isServer: true }
    let el = shallow(<Page store={store} />)
    expect(el.find('div').length).toBe(1)
    expect(el.text()).toBe('')

    store.isServer = false
    store.lapse = 1000
    el = shallow(<Page store={store} />)
    expect(el.find(StopWatch).length).toBe(1)
  })
})
