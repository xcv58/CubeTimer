import React from 'react'
import { Provider } from 'mobx-react'
import { initStore, initRecordsStore } from '../stores'
import Page from './Page'
import { initGA, ReactGA } from '../libs/utils'

export default class Root extends React.Component {
  constructor (props) {
    super(props)
    this.store = initStore(this.props.isServer)
    this.recordsStore = initRecordsStore(this.props.isServer)
  }

  render () {
    return (
      <Provider store={this.store} recordsStore={this.recordsStore}>
        <Page {...{ initGA, ReactGA }} />
      </Provider>
    )
  }
}
