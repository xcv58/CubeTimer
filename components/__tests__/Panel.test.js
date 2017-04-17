/* global it, expect, describe */
import React from 'react'
import Panel from '../Panel'
import { spy } from 'sinon'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

describe('Panel', () => {
  it('render null if records is empty', () => {
    const recordsStore = { records: [] }
    const el = shallow(<Panel recordsStore={recordsStore} />)
    expect(el).toBeTruthy()
    expect(el.text()).toBe('')

    const tree = renderer.create(
      <Panel recordsStore={recordsStore} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('render clear and call clear onClick', () => {
    const recordsStore = { records: [ 42 ], clear: spy() }
    const expectedText = 'clear'
    const el = shallow(<Panel recordsStore={recordsStore} />)
    expect(el.text()).toBe(expectedText)
    expect(el.find({ children: expectedText }).exists()).toBe(true)
    expect(recordsStore.clear.callCount).toBe(0)
    el.find({ children: expectedText }).props().onClick()
    expect(recordsStore.clear.callCount).toBe(1)
    el.find({ children: expectedText }).props().onClick()
    expect(recordsStore.clear.callCount).toBe(2)

    const tree = renderer.create(
      <Panel recordsStore={recordsStore} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
