/* global it, expect, describe */
import { clear, assign, get, initLocalProfile } from '../LocalProfile'
import { spy, stub } from 'sinon'

describe('Methods: clear, assign, and get', () => {
  const observableProfile = spy()
  observableProfile.dispose = spy()
  observableProfile.key = 42

  it('Methods has no effect if init fail', () => {
    const createObservable = stub()
    createObservable.returns(null)
    const localProfile = initLocalProfile(42, createObservable)
    expect(localProfile).toBe(null)
    clear()
    assign()
    expect(get('key', 42)).toBe(42)
  })

  it('initLocalProfile', () => {
    const createObservable = stub()
    createObservable.returns(observableProfile)
    const localProfile = initLocalProfile(42, createObservable)
    expect(localProfile).toBe(observableProfile)
    expect(createObservable.calledWith(
      'profile',
      {
        lapse: 0,
        max: 0,
        min: Infinity,
        sum: 0,
        average: 0,
        records: []
      },
      42
    )).toBe(true)

    expect(initLocalProfile(42, createObservable)).toBe(observableProfile)
    expect(createObservable.callCount).toBe(1)

    expect(initLocalProfile()).toBe(observableProfile)
    expect(createObservable.callCount).toBe(1)
  })

  it('clear call correct function', () => {
    expect(observableProfile.dispose.callCount).toBe(0)
    clear()
    expect(observableProfile.dispose.callCount).toBe(1)
    clear()
    expect(observableProfile.dispose.callCount).toBe(2)
  })

  it('get works correctly', () => {
    expect(get('key', 0)).toBe(42)
    expect(get('non-existing-key', 0)).toBe(0)
  })

  it('assign', () => {
    expect(get('answer', 0)).toBe(0)
    assign({ answer: 42 })
    expect(get('answer')).toBe(42)
  })
})
