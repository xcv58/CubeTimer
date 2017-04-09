import React from 'react'
import { observer } from 'mobx-react'
import { getTimeObj } from '../libs/utils'
import Time from './Time'

@observer
class StopWatch extends React.Component {
  render () {
    const { lapse } = this.props

    return (
      <div style={{
        font: '5rem menlo, monaco, monospace'
      }}>
        <Time {...getTimeObj(lapse)} />
      </div>
    )
  }
}

export default StopWatch
