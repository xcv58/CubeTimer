/* global it, expect, describe */
import React from 'react'
import Panel from '../Panel'
import { spy } from 'sinon'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Button from 'material-ui/Button'

describe('Panel', () => {
  it(
    'render null if records is empty and stopwatch is running or lapse is 0',
    () => {
      const recordsStore = { records: [] }
      const store = { running: true, lapse: 0 }
      let el = shallow(<Panel {...{ recordsStore, store }} />)
      expect(el).toBeTruthy()
      expect(el.text()).toBe('')
      el = shallow(<Panel {...{
        recordsStore,
        store: { running: false, lapse: 0 }
      }} />)
      expect(el).toBeTruthy()
      expect(el.text()).toBe('')
      el = shallow(<Panel {...{
        recordsStore,
        store: { running: true, lapse: 100 }
      }} />)
      expect(el).toBeTruthy()
      expect(el.text()).toBe('')

      const tree = renderer.create(
        <Panel {...{ recordsStore, store }} />
      ).toJSON()
      expect(tree).toMatchSnapshot()
    })

  it('render clear and call clear onClick', () => {
    const recordsStore = { records: [ 42 ], clear: spy() }
    const store = { clear: spy() }
    const props = { store, recordsStore }
    const expectedText = 'Clear'
    const el = shallow(<Panel {...props} />)
    expect(el.find(Button).is({ children: expectedText })).toBe(true)
    expect(el.find(Button).exists()).toBe(true)
    expect(store.clear.callCount).toBe(0)
    expect(recordsStore.clear.callCount).toBe(0)
    el.find(Button).props().onClick()
    expect(store.clear.callCount).toBe(1)
    expect(recordsStore.clear.callCount).toBe(1)
    el.find(Button).props().onClick()
    expect(store.clear.callCount).toBe(2)
    expect(recordsStore.clear.callCount).toBe(2)

    const tree = renderer.create(
      <Panel {...props} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
