import React from 'react'
import { Provider } from 'mobx-react'
import { initStore, initRecordsStore } from '../stores'
import Page from '../components/Page'
import { initGA, ReactGA } from '../libs/utils'

export default class CubeTimer extends React.Component {
  static getInitialProps ({ req }) {
    const isServer = !!req
    return { isServer }
  }

  constructor (props) {
    super(props)
    this.store = initStore(props.isServer)
    this.recordsStore = initRecordsStore(props.isServer)
  }

  render () {
    return (
      <Provider store={this.store} recordsStore={this.recordsStore}>
        <Page {...{ initGA, ReactGA }} />
      </Provider>
    )
  }
}
