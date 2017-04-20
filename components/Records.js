import React from 'react'
import { inject, observer } from 'mobx-react'
import Panel from './Panel'
import { getTimeObj } from '../libs/utils'

const getStyle = ({ min, lapse }) => {
  if (min === lapse) {
    return { color: 'black' }
  }
}

export const Record = ({ lapse, min, index }) => {
  const { minute, second, millisecond } = getTimeObj(lapse)
  const value = `${minute}:${second}:${millisecond}`
  return (
    <div className='timebar' style={getStyle({ min, lapse })}>
      <span style={{ float: 'left', width: 0 }}>{index}</span>
      {value}
    </div>
  )
}

@inject('recordsStore')
@observer
class Records extends React.Component {
  render () {
    const { records, min } = this.props.recordsStore
    const length = records.length
    const list = records.map((record, i) => (
      <Record key={record.timestamp} {...{ min, index: length - i }} {...record} />
    ))
    return (
      <div style={{
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{
          maxHeight: '50vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          borderTop: '1px solid #ededed',
          alignItems: 'center'
        }}>
          {list}
        </div>
        <Panel />
      </div>
    )
  }
}

export default Records
