import React from 'react'
import { inject, observer } from 'mobx-react'
import Button from '@material-ui/core/Button'

@inject('store')
@inject('recordsStore')
@observer
export default class Panel extends React.Component {
  clear = () => {
    const { recordsStore, store } = this.props
    recordsStore.clear()
    store.clear()
  }

  render () {
    const { recordsStore: { records }, store: { running, lapse } } = this.props
    if (records.length < 1 && (running || lapse === 0)) {
      return null
    }
    return (
      <div className='timebar' style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Button onClick={this.clear}
          disabled={running}
          style={{ width: '100%' }}>
          Clear
        </Button>
      </div>
    )
  }
}
