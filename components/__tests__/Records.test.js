/* global it, expect, describe */
import React from 'react'
import Records, { Record } from '../Records'
import Panel from '../Panel'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

describe('Record', () => {
  it('render correct text', () => {
    const el = shallow(<Record {...{ lapse: 42, min: 1, index: 1 }} />)
    expect(el.text().includes('00:00:04')).toBe(true)
    expect(el.text().endsWith('00:00:04')).toBe(true)
    expect(el.text().startsWith(1)).toBe(true)
    expect(true)
  })

  it('render correct style', () => {
    let el = shallow(<Record {...{ lapse: 42, min: 1, index: 1 }} />)
    expect(el.find('div').props().style).toBe(undefined)
    let tree = renderer.create(
      <Record {...{ lapse: 42, min: 1, index: 1 }} />
    ).toJSON()
    expect(tree).toMatchSnapshot()

    el = shallow(<Record {...{ lapse: 42, min: 42, index: 1 }} />)
    expect(el.find('div').is({ style: { color: 'black' } })).toBe(true)
    tree = renderer.create(
      <Record {...{ lapse: 42, min: 42, index: 1 }} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Records', () => {
  it('render Panel', () => {
    const recordsStore = { records: [] }
    const props = { recordsStore }
    const el = shallow(<Records {...props} />)
    expect(el.find(Panel).exists()).toBe(true)
  })

  it('render list of Record', () => {
    const recordsStore = {
      min: 42,
      records: [
        { lapse: 42, timestamp: 1 },
        { lapse: 153, timestamp: 2 }
      ]
    }
    const props = { recordsStore }
    const el = shallow(<Records {...props} />)
    expect(el.find(Record).length).toBe(recordsStore.records.length)
  })
})
