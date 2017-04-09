import { action, observable } from 'mobx'

let store = null

class Store {
  @observable running = false
  @observable standby = false
  @observable startTime = 0
  @observable lapse = 0
  @observable records = []

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
    this.records.push(this.lapse)
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
    if (store === null) {
      store = new Store(isServer)
    }
    return store
  }
}
