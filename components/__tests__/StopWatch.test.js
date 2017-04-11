/* global it, expect, describe */
import React from 'react'
import StopWatch from '../StopWatch'
import { getTimeObj } from '../../libs/utils'
import { shallow } from 'enzyme'

describe('StopWatch', () => {
  it('render without crash', () => {
    const el = shallow(<StopWatch store={{}} />)
    expect(el).toBeTruthy()
  })

  it('render running status', () => {
    const store = {
      running: true
    }
    let el = shallow(<StopWatch store={store} />)
    expect(el.find('input').is({ style: { color: 'red' } })).toBe(true)

    store.running = false
    el = shallow(<StopWatch store={store} />)
    expect(el.find('input').is({ style: { color: 'black' } })).toBe(true)
  })

  it('render input with correct props', () => {
    const store = { lapse: Math.random() }
    const el = shallow(<StopWatch store={store} />)
    const { minute, second, millisecond } = getTimeObj(store.lapse)

    expect(el.find('input').length).toBe(1)
    expect(el.find('input').is({ disabled: true })).toBe(true)
    expect(el.find('input').is({ value: `${minute}:${second}:${millisecond}` })).toBe(true)
  })
})
