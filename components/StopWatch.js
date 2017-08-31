import React from 'react'
import { inject, observer } from 'mobx-react'
import { getTimeObj } from '../libs/utils'

@inject('store')
@observer
export default class StopWatch extends React.Component {
  render () {
    const { lapse, running, standby, isServer } = this.props.store
    const { minute, second, millisecond } = getTimeObj(lapse)
    const value = isServer ? '...' : `${minute}:${second}:${millisecond}`
    const style = { color: (running || standby) ? 'red' : 'black' }
    return (
      <div className='timebar stopwatch' style={style}>
        {value}
      </div>
    )
  }
}
