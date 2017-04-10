import React from 'react'
import { inject, observer } from 'mobx-react'
import { isSpace } from '../libs/utils'
import StopWatch from './StopWatch'
// import Records from './Records'

@inject('store')
@inject('recordsStore')
@observer
class Page extends React.Component {
  componentDidMount () {
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
    document.documentElement.addEventListener('touchend', this.onTouchEnd, true)
    document.documentElement.addEventListener('touchstart', (event) => {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
      this.onTouchStart(event)
    }, true)
  }

  onKeyDown = (event) => {
    if (isSpace(event)) {
      event.preventDefault()
      this.onTouchStart()
    }
  }

  onKeyUp = (event) => {
    if (isSpace(event)) {
      event.preventDefault()
      this.onTouchEnd()
    }
  }

  onTouchStart = () => {
    const { store: { running, prepare, toggle, lapse } } = this.props
    const { recordsStore: { newRecord } } = this.props
    if (running) {
      newRecord(lapse, Date.now())
      toggle()
    } else {
      prepare()
    }
  }

  onTouchEnd = () => {
    const { store: { toggle, standby } } = this.props
    if (standby) {
      toggle()
    }
  }

  render () {
    const { store } = this.props
    const { isServer } = store
    // TODO: render meaningful information for server side rendering, new UI design needed.
    if (isServer) {
      return (<div />)
    }
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '89vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <StopWatch />
        {/* <Records /> */}
      </div>
    )
  }
}

export default Page
