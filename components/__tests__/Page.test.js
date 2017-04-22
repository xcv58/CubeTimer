/* global it, expect, describe */
import React from 'react'
import ReactDOM from 'react-dom'
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

  it('call store.cancel onTouchCancel', () => {
    const store = { cancel: spy() }
    const el = shallow(<Page {...{ store }} />)
    el.instance().onTouchCancel()
    expect(store.cancel.callCount).toBe(1)
  })

  it('onTouchEnd call this.release()', () => {
    const el = shallow(<Page />)
    el.instance().release = spy()
    el.instance().onTouchEnd()
    expect(el.instance().release.callCount).toBe(1)
  })

  it('onKeyUp', () => {
    const event = { preventDefault: spy(), which: 32 }
    const el = shallow(<Page />)
    el.instance().release = spy()
    el.instance().onKeyUp(event)
    expect(event.preventDefault.callCount).toBe(1)
    expect(el.instance().release.callCount).toBe(1)

    event.which = 42
    el.instance().onKeyUp(event)
    expect(event.preventDefault.callCount).toBe(1)
    expect(el.instance().release.callCount).toBe(1)
  })

  it('onKeyDown', () => {
    const event = { preventDefault: spy(), which: 32 }
    const el = shallow(<Page />)
    el.instance().hold = spy()
    el.instance().onKeyDown(event)
    expect(event.preventDefault.callCount).toBe(1)
    expect(el.instance().hold.callCount).toBe(1)

    event.which = 42
    el.instance().onKeyDown(event)
    expect(event.preventDefault.callCount).toBe(1)
    expect(el.instance().hold.callCount).toBe(1)
  })

  it('onTouchStart', () => {
    const event = { preventDefault: spy(), touches: [] }

    const el = shallow(<Page />)

    const findDOMNode = stub(ReactDOM, 'findDOMNode')
    const contains = stub()
    findDOMNode.returns({ contains })
    contains.returns(false)

    el.instance().hold = spy()
    el.instance().onTouchStart(event)
    expect(event.preventDefault.callCount).toBe(1)
    expect(el.instance().hold.callCount).toBe(1)

    contains.returns(true)
    el.instance().onTouchStart(event)
    expect(event.preventDefault.callCount).toBe(1)
    expect(el.instance().hold.callCount).toBe(1)

    event.touches = [ 1, 2, 3 ]
    el.instance().onTouchStart(event)
    expect(event.preventDefault.callCount).toBe(2)
    expect(el.instance().hold.callCount).toBe(1)
  })

  it('hold call prepare when not running', () => {
    const ReactGA = { event: spy() }
    const prepare = spy()
    const el = shallow(
      <Page {...{
        store: { prepare, running: false },
        recordsStore: {},
        ReactGA
      }} />
    )
    el.instance().hold()
    expect(prepare.callCount).toBe(1)
    expect(ReactGA.event.args).toEqual([
      [ { category: 'Timer', action: 'Hold' } ]
    ])
  })

  it('hold call newRecord and toggle if it is running', () => {
    const ReactGA = { event: spy() }
    const toggle = spy()
    const newRecord = spy()
    const lapse = 42
    const el = shallow(
      <Page {...{
        store: { toggle, lapse, running: true },
        recordsStore: { newRecord },
        ReactGA
      }} />
    )
    el.instance().hold()
    expect(newRecord.callCount).toBe(1)
    expect(newRecord.args[0][0]).toBe(lapse)
    expect(toggle.callCount).toBe(1)
    expect(ReactGA.event.args).toEqual([
      [{
        category: 'Timer',
        action: 'Stop',
        value: lapse
      }]
    ])
  })
})
