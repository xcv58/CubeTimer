import { action, observable } from 'mobx'
import * as LocalProfile from '../libs/LocalProfile'

let store = null

class RecordsStore {
  @observable records = [...LocalProfile.get('records', [])]
  @observable max = LocalProfile.get('max', 0)
  @observable min = LocalProfile.get('min', Infinity)
  @observable average = LocalProfile.get('average', null)
  @observable sum = LocalProfile.get('sum', null)

  @action newRecord = (lapse, timestamp) => {
    const record = { lapse, timestamp }
    this.records.unshift(record)

    this.max = Math.max(this.max, lapse)
    this.min = Math.min(this.min, lapse)
    this.sum += lapse
    this.average = this.sum / this.records.length

    this.updateLocalProfile(record)
  }

  updateLocalProfile = () => {
    const { min, max, sum, average, records } = this
    LocalProfile.assign({ min, max, sum, average, records })
  }
}

export function initRecordsStore (isServer) {
  if (isServer && typeof window === 'undefined') {
    return new RecordsStore(isServer)
  } else {
    if (typeof localStorage !== 'undefined') {
      LocalProfile.initLocalProfile()
    }
    if (store === null) {
      store = new RecordsStore(isServer)
    }
    return store
  }
}
