/* global it, expect, describe */
import React from 'react'
import StopWatch from '../StopWatch'
import Time from '../Time'
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
    expect(el.is({ style: { color: 'red' } })).toBe(true)

    store.running = false
    el = shallow(<StopWatch store={store} />)
    expect(el.is({ style: { color: 'black' } })).toBe(true)
  })

  it('render Time with correct props', () => {
    const store = { lapse: Math.random() }
    const el = shallow(<StopWatch store={store} />)
    expect(el.find(Time).length).toBe(1)
    expect(el.find(Time).is(getTimeObj(store.lapse))).toBe(true)
  })
})
