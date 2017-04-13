import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('recordsStore')
@observer
class Panel extends React.Component {
  render () {
    const { recordsStore: { clear, records } } = this.props
    if (records.length < 1) {
      return null
    }
    return (
      <div className='timebar' style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <span onClick={clear}>
          clear
        </span>
      </div>
    )
  }
}

export default Panel
