import React from 'react'
import dynamic from 'next/dynamic'

export default class CubeTimer extends React.Component {
  state = { isServer: true }

  componentDidMount () {
    this.setState({ isServer: false })
  }

  render () {
    if (this.state.isServer) {
      return 'Loading...'
    }
    const Root = dynamic(import('../components/Root'))
    return <Root />
  }
}
