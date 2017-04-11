import React from 'react'
import { inject, observer } from 'mobx-react'
import { getTimeObj } from '../libs/utils'

@inject('store')
@observer
class StopWatch extends React.Component {
  render () {
    const { lapse, running } = this.props.store
    const { minute, second, millisecond } = getTimeObj(lapse)
    return (
      <div style={{
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px 0px, rgba(0, 0, 0, 0.1) 0px 25px 50px 0px'
      }}>
        <input disabled value={`${minute}:${second}:${millisecond}`}
          style={{
            color: running ? 'red' : 'black',
            font: '3rem menlo, monaco, monospace',
            width: '5.5em',
            padding: '1rem',
            userSelect: 'none',
            textAlign: 'center',
            border: 'none'
          }}
        />
      </div>
    )
  }
}

export default StopWatch
