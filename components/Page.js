import React from 'react'
import { inject, observer } from 'mobx-react'
import { isSpace } from '../libs/utils'
import StopWatch from './StopWatch'
import ReactDOM from 'react-dom'
import Records from './Records'

@inject('store')
@inject('recordsStore')
@observer
class Page extends React.Component {
  componentDidMount () {
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
    document.addEventListener('touchcancel', this.onTouchCancel, true)
    document.addEventListener('touchend', this.onTouchEnd, true)
    document.addEventListener('touchstart', (event) => {
      // This is preventing zoom out in iOS Safari
      if (event.touches.length > 1) {
        event.preventDefault()
      }
      this.onTouchStart(event)
    }, true)
  }

  onKeyDown = (event) => {
    if (isSpace(event)) {
      event.preventDefault()
      this.hold()
    }
  }

  onKeyUp = (event) => {
    if (isSpace(event)) {
      event.preventDefault()
      this.release()
    }
  }

  onTouchStart = (event) => {
    const res = ReactDOM.findDOMNode(this.refs.content)
    if (!res.contains(event.target)) {
      this.hold()
    }
  }

  onTouchEnd = () => {
    this.release()
  }

  onTouchCancel = () => {
    this.props.store.cancel()
  }

  hold = () => {
    const { store: { running, prepare, toggle, lapse } } = this.props
    const { recordsStore: { newRecord } } = this.props
    if (running) {
      newRecord(lapse, Date.now())
      toggle()
    } else {
      prepare()
    }
  }

  release = () => {
    const { store: { toggle, standby } } = this.props
    if (standby) {
      toggle()
    }
  }

  render () {
    // TODO: render meaningful information for server side rendering, new UI design needed.
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '8%'
      }}>
        <div ref='content'
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px 0px, rgba(0, 0, 0, 0.1) 0px 25px 50px 0px'
          }}>
          <StopWatch />
          <Records />
        </div>
      </div>
    )
  }
}

export default Page
