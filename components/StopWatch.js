import React from 'react'
import { observer } from 'mobx-react'
import { getTimeObj } from '../libs/utils'
import Time from './Time'

@observer
class StopWatch extends React.Component {
  render () {
    const { lapse, running } = this.props
    return (
      <div style={{
        font: '5rem menlo, monaco, monospace',
        color: running ? 'red' : 'black'
      }}>
        <Time {...getTimeObj(lapse)} />
      </div>
    )
  }
}

export default StopWatch
