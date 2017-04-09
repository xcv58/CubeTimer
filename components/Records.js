import React from 'react'
import { getTimeObj } from '../libs/utils'
import Time from './Time'

const Record = ({ title, record }) => {
  if (!record || !record.lapse) {
    return null
  }
  return (
    <div>
      {title}: <Time {...getTimeObj(record.lapse)} />
    </div>
  )
}

export default class Records extends React.Component {
  render () {
    const { records, max, min, average } = this.props
    const list = records.map(({ lapse }, i) => (
      <Time key={i} {...getTimeObj(lapse)} />
    ))
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Record title='Best' record={min} />
        <Record title='Worst' record={max} />
        <Record title='Average' record={{ lapse: average }} />
        {list}
      </div>
    )
  }
}
