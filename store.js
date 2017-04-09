import { action, observable } from 'mobx'

let store = null

class Store {
  @observable running = false
  @observable lapse = 0
  @observable records = []
  @observable startTime = 0

  @observable standby = false

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
  }

  prepare = () => {
    this.standby = true
  }
}

export function initStore (isServer, lastUpdate = Date.now()) {
  if (isServer && typeof window === 'undefined') {
    return new Store(isServer, lastUpdate)
  } else {
    if (store === null) {
      store = new Store(isServer, lastUpdate)
    }
    return store
  }
}
