import React from 'react'
import { Provider } from 'mobx-react'
import { initStore } from '../store'
import Page from '../components/Page'

export default class Counter extends React.Component {
  static getInitialProps ({ req }) {
    const isServer = !!req
    return { isServer }
  }

  constructor (props) {
    super(props)
    this.store = initStore(props.isServer)
  }

  render () {
    return (
      <Provider store={this.store}>
        <Page />
      </Provider>
    )
  }
}
