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
    const { toggle } = store
    // const { recordsStore: { records, max, min, average } } = this.props
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '61vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd} >
        <div onClick={toggle}>
          <StopWatch {...store} />
        </div>
        {/* <Records {...{ records, max, min, average }} /> */}
      </div>
    )
  }
}

export default Page
