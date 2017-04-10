/* global it, expect, describe */
import { getTimeObj, isSpace } from '../utils'

describe('getTimeObj', () => {
  it('return an object', () => {
    const res = getTimeObj()
    expect(typeof res).toBe('object')
  })

  it('return correct millisecond', () => {
    let res = getTimeObj(0)
    expect(res.millisecond).toBe('00')

    res = getTimeObj(1000)
    expect(res.millisecond).toBe('00')

    res = getTimeObj(153153)
    expect(res.millisecond).toBe('15')

    res = getTimeObj(548834)
    expect(res.millisecond).toBe('83')
  })

  it('return correct second', () => {
    let res = getTimeObj(0)
    expect(res.second).toBe('00')

    res = getTimeObj(1000)
    expect(res.second).toBe('01')

    res = getTimeObj(59999)
    expect(res.second).toBe('59')

    res = getTimeObj(60000)
    expect(res.second).toBe('00')

    res = getTimeObj(61000)
    expect(res.second).toBe('01')

    res = getTimeObj(153000)
    expect(res.second).toBe('33')

    res = getTimeObj(153153)
    expect(res.second).toBe('33')

    res = getTimeObj(548834)
    expect(res.second).toBe('08')
  })

  it('return correct mintue', () => {
    let res = getTimeObj(0)
    expect(res.minute).toBe('00')

    res = getTimeObj(1000)
    expect(res.minute).toBe('00')

    res = getTimeObj(59999)
    expect(res.minute).toBe('00')

    res = getTimeObj(60000)
    expect(res.minute).toBe('01')

    res = getTimeObj(119999)
    expect(res.minute).toBe('01')

    res = getTimeObj(120000)
    expect(res.minute).toBe('02')

    res = getTimeObj(3600 * 1000)
    expect(res.minute).toBe('60')

    res = getTimeObj(3659 * 1000)
    expect(res.minute).toBe('60')

    res = getTimeObj(3660 * 1000)
    expect(res.minute).toBe('61')

    res = getTimeObj(3661 * 1000)
    expect(res.minute).toBe('61')

    res = getTimeObj(153 * 60000)
    expect(res.minute).toBe('153')
  })
})

describe('isSpace', () => {
  it('would not crash', () => {
    expect(isSpace()).toBe(false)
    expect(isSpace({})).toBe(false)
  })

  it('check is space', () => {
    const event = { which: 32 }
    expect(isSpace(event)).toBe(true)
    expect(isSpace({ which: 42 })).toBe(false)
  })
})
