import React from 'react'
import { inject, observer } from 'mobx-react'
import { getTimeObj } from '../libs/utils'

const getStyle = ({ min, max, lapse }) => {
  const isMin = min === lapse
  const isMax = max === lapse
  if (isMin && !isMax) {
    return { color: 'black' }
  }
}

const Record = ({ lapse, timestamp, min, max, index }) => {
  const { minute, second, millisecond } = getTimeObj(lapse)
  const value = `${minute}:${second}:${millisecond}`
  return (
    <div className='timebar' style={getStyle({ min, max, lapse })}>
      <span style={{ float: 'left', width: 0 }}>{index}</span>
      {value}
    </div>
  )
}

@inject('recordsStore')
@observer
class Records extends React.Component {
  render () {
    const { records, min, max } = this.props.recordsStore
    const length = records.length
    const list = records.map((record, i) => (
      <Record key={record.timestamp} {...{ min, max, index: length - i }} {...record} />
    ))
    return (
      <div style={{
        maxHeight: '50vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        borderTop: '1px solid #ededed',
        alignItems: 'center',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2)'
      }}>
        {list}
      </div>
    )
  }
}

export default Records
