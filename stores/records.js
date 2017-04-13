import { action, observable } from 'mobx'
import * as LocalProfile from '../libs/LocalProfile'

let store = null

class RecordsStore {
  @observable records = [...LocalProfile.get('records', [])]
  @observable max = LocalProfile.get('max', 0)
  @observable min = LocalProfile.get('min', Infinity)

  @action newRecord = (lapse, timestamp) => {
    const record = { lapse, timestamp }
    this.records.unshift(record)

    this.max = Math.max(this.max, lapse)
    this.min = Math.min(this.min, lapse)

    this.updateLocalProfile(record)
  }

  @action clear = () => {
    this.records = []
    this.max = 0
    this.min = Infinity
    this.updateLocalProfile()
  }

  updateLocalProfile = () => {
    const { min, max, records } = this
    LocalProfile.assign({ min, max, records })
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
