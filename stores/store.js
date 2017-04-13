import { action, observable } from 'mobx'
import * as LocalProfile from '../libs/LocalProfile'

let store = null

class Store {
  constructor (isServer) {
    this.isServer = isServer
  }

  @observable running = false
  @observable standby = false
  @observable startTime = 0
  @observable lapse = LocalProfile.get('lapse', 0)

  @action toggle = () => {
    if (this.running) {
      this.stop()
    } else {
      this.start()
    }
  }

  @action start = () => {
    this.lapse = 0
    this.startTime = Date.now()
    this.running = true
    this.standby = false

    this.timer = setInterval(() => {
      this.lapse = Date.now() - this.startTime
    }, 10)
  }

  @action stop = () => {
    this.running = false
    clearInterval(this.timer)
    LocalProfile.assign({ lapse: this.lapse })
  }

  @action prepare = () => {
    this.standby = true
  }

  @action cancel = () => {
    this.standby = false
  }
}

export function initStore (isServer) {
  if (isServer && typeof window === 'undefined') {
    return new Store(isServer)
  } else {
    if (typeof localStorage !== 'undefined') {
      LocalProfile.initLocalProfile()
    }
    if (store === null) {
      store = new Store(false)
    }
    return store
  }
}
