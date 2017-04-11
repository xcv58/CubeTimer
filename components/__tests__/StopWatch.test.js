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
    const store = { running: true }
    const getTarget = el => el.find('div > div')
    let el = shallow(<StopWatch store={store} />)

    expect(getTarget(el).is({ style: { color: 'red' } })).toBe(true)

    store.running = false
    el = shallow(<StopWatch store={store} />)

    expect(getTarget(el).is({ style: { color: 'black' } })).toBe(true)
  })

  it('render correct time', () => {
    const store = { lapse: Math.random() }
    const el = shallow(<StopWatch store={store} />)
    const { minute, second, millisecond } = getTimeObj(store.lapse)

    expect(el.text()).toBe(`${minute}:${second}:${millisecond}`)
  })
})
