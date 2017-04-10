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
    this.startTime = Date.now()
    this.running = true
    this.standby = false

    this.timer = setInterval(() => {
      this.lapse = Date.now() - this.startTime
    }, 10)
  }

  stop = () => {
    this.running = false
    clearInterval(this.timer)
    observableProfile.lapse = this.lapse
  }

  prepare = () => {
    this.standby = true
    this.lapse = 0
  }
}

export function initStore (isServer) {
  if (isServer && typeof window === 'undefined') {
    return new Store(isServer)
  } else {
    if (observableProfile === null) {
      observableProfile = storedObservable('profile', defaultProfile, 500)
    }
    if (store === null) {
      store = new Store(false)
    }
    return store
  }
}
