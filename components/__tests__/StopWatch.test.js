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

  it('render highlight color when (running || standby) === true', () => {
    const store = { running: true, standby: true }
    const getTarget = el => el.find('div')
    let el = shallow(<StopWatch store={store} />)

    expect(getTarget(el).is({ style: { color: 'red' } })).toBe(true)

    store.running = true
    store.standby = false
    el = shallow(<StopWatch store={store} />)
    expect(getTarget(el).is({ style: { color: 'red' } })).toBe(true)

    store.running = false
    store.standby = true
    el = shallow(<StopWatch store={store} />)
    expect(getTarget(el).is({ style: { color: 'red' } })).toBe(true)

    store.running = false
    store.standby = false
    el = shallow(<StopWatch store={store} />)
    expect(getTarget(el).is({ style: { color: 'black' } })).toBe(true)
  })

  it('render ... for SSR', () => {
    const store = { lapse: Math.random(), isServer: true }
    const el = shallow(<StopWatch store={store} />)

    expect(el.text()).toBe('...')
  })

  it('render correct time', () => {
    const store = { lapse: Math.random() }
    const el = shallow(<StopWatch store={store} />)
    const { minute, second, millisecond } = getTimeObj(store.lapse)

    expect(el.text()).toBe(`${minute}:${second}:${millisecond}`)
  })
})
