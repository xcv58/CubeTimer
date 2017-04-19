import { action, computed, observable } from 'mobx'
import * as LocalProfile from '../libs/LocalProfile'

let store = null

class RecordsStore {
  @observable records = [...LocalProfile.get('records', [])]
  @computed get min () {
    return Math.min(...this.records.map(x => x.lapse))
  }

  @action newRecord = (lapse, timestamp) => {
    const record = { lapse, timestamp }
    this.records.unshift(record)
    this.updateLocalProfile()
  }

  @action clear = () => {
    this.records = []
    this.updateLocalProfile()
  }

  updateLocalProfile = () => {
    const { records } = this
    LocalProfile.assign({ records })
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
