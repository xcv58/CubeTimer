import { observable } from 'mobx'

let store = null

class RecordsStore {
  @observable records = []
  @observable max = 0
  @observable min = Infinity
  @observable average = null
  sum = 0

  newRecord = (lapse, timestamp) => {
    const record = { lapse, timestamp }
    this.records.unshift(record)

    this.max = Math.max(this.max, lapse)
    this.min = Math.min(this.min, lapse)
    this.sum += lapse
    this.average = this.sum / this.records.length
  }
}

export function initRecordsStore (isServer) {
  if (isServer && typeof window === 'undefined') {
    return new RecordsStore(isServer)
  } else {
    if (store === null) {
      store = new RecordsStore(isServer)
    }
    return store
  }
}
