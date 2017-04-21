/* global it, expect, describe */
import React from 'react'
import { spy, stub } from 'sinon'
import Page from '../Page'
import StopWatch from '../StopWatch'
import Records from '../Records'
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

  it('render StopWatch and Records', () => {
    const store = {}
    const el = shallow(<Page store={store} />)
    expect(el.find(StopWatch).length).toBe(1)
    expect(el.find(Records).length).toBe(1)
  })

  it('call correct methods in componentDidMount', () => {
    const store = {}
    const initGA = spy()
    const addEventListener = stub(document, 'addEventListener')
    const el = shallow(<Page {...{ store, initGA }} />)
    el.instance().componentDidMount()

    expect(initGA.callCount).toBe(1)

    const events = [
      [ 'keydown', el.instance().onKeyDown ],
      [ 'keyup', el.instance().onKeyUp ],
      [ 'touchcancel', el.instance().onTouchCancel ],
      [ 'touchend', el.instance().onTouchEnd ],
      [ 'touchstart', el.instance().onTouchStart ]
    ]
    expect(addEventListener.callCount).toBe(events.length)
    expect(addEventListener.args.map(x => [ x[0], x[1] ])).toEqual(events)
  })

  it('release call', () => {
    const toggle = spy()
    const ReactGA = { event: spy() }
    let el = shallow(<Page {...{ store: { toggle, standby: true }, ReactGA }} />)
    el.instance().release()
    expect(toggle.callCount).toBe(1)
    expect(ReactGA.event.callCount).toBe(1)
    expect(ReactGA.event.args).toEqual([
      [{ category: 'Timer', action: 'Start' }]
    ])

    el = shallow(<Page {...{ store: { toggle, standby: false }, ReactGA }} />)
    el.instance().release()
    expect(toggle.callCount).toBe(1)
    expect(ReactGA.event.callCount).toBe(1)
  })
})
