import { observable } from 'mobx'

let store = null

const getMax = (a, b) => {
  if (a === null) {
    return b
  }
  if (a.lapse <= b.lapse) {
    return b
  }
  return a
}
const getMin = (a, b) => {
  if (a === null) {
    return b
  }
  if (a.lapse >= b.lapse) {
    return b
  }
  return a
}

class RecordsStore {
  @observable records = []
  @observable max = null
  @observable min = null
  @observable average = null
  sum = 0

  newRecord = (lapse, timestamp) => {
    const record = { lapse, timestamp }
    this.records.push(record)
    this.max = getMax(this.max, record)
    this.min = getMin(this.min, record)
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
