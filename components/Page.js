import React from 'react'
import { inject, observer } from 'mobx-react'
import StopWatch from './StopWatch'
import { isSpace } from '../libs/utils'

@inject('store') @observer
class Page extends React.Component {
  componentDidMount () {
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
  }

  onKeyDown = (event) => {
    if (isSpace(event)) {
      event.preventDefault()
      const { store: { running, prepare, toggle } } = this.props
      if (running) {
        toggle()
      } else {
        prepare()
      }
    }
  }

  onKeyUp = (event) => {
    if (isSpace(event)) {
      event.preventDefault()
      const { store: { toggle, standby } } = this.props
      if (standby) {
        toggle()
      }
    }
  }

  render () {
    const { store } = this.props
    const { toggle } = store
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '61vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div onClick={toggle}
          onKeyPress={() => { console.log('test') }}
          >
          <StopWatch {...store} />
        </div>
      </div>
    )
  }
}

export default Page
