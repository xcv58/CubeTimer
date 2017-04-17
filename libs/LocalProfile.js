import storedObservable from 'mobx-stored'

const defaultProfile = {
  lapse: 0,
  max: 0,
  min: Infinity,
  sum: 0,
  average: 0,
  records: []
}

let observableProfile = null

export const clear = () => {
  if (observableProfile !== null) {
    observableProfile.dispose()
  }
}

export const assign = (obj) => {
  if (observableProfile !== null) {
    Object.assign(observableProfile, obj)
  }
}

export const get = (key, defaultValue) => {
  if (observableProfile !== null) {
    return observableProfile[key] || defaultValue
  }
  return defaultValue
}

export const initLocalProfile = (updateInterval = 500, createObservable = storedObservable) => {
  if (observableProfile === null) {
    observableProfile = createObservable('profile', defaultProfile, updateInterval)
  }
  return observableProfile
}
