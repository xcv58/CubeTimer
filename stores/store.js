import { action, observable } from 'mobx'
import storedObservable from 'mobx-stored'

const defaultProfile = { lapse: 0 }

let store = null
let observableProfile = null

class Store {
  constructor (isServer) {
    this.isServer = isServer
  }

  @observable running = false
  @observable standby = false
  @observable startTime = 0
  @observable lapse = observableProfile === null ? 0 : observableProfile.lapse

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
    observableProfile.lapse = this.lapse
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
    if (observableProfile === null && typeof localStorage !== 'undefined') {
      observableProfile = storedObservable('profile', defaultProfile, 500)
    }
    if (store === null) {
      store = new Store(false)
    }
    return store
  }
}
