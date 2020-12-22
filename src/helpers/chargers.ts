// import services from 'services'
import services from 'services'
import defaults from 'utils/defaults'
import { ChargersResponseWithTime } from 'types'

/**
 * If cached chargers are expired refresh them and return,
 * or else cache and return fresh ones.
 */
export const refreshAndCacheChargers = async () => {
  const haveExpired = haveLocalChargersExpired()

  if (haveExpired) {
    const retrievedChargers = await services.getChargers()

    console.groupCollapsed('Chargers')
    console.log(retrievedChargers)
    console.groupEnd()

    const now = new Date().getTime()
    const dataToCache = {
      data: retrievedChargers,
      time: now,
    }
    defaults.chargers = dataToCache as unknown as ChargersResponseWithTime
    return retrievedChargers
  }

  const cachedChargers = getCachedChargers()
  return cachedChargers?.data
}

/**
 * Determine if cached chargers are expired.
 */
export const haveLocalChargersExpired = () => {
  const date = new Date()
  const cachedChargers = getCachedChargers()

  if (cachedChargers) {
    const millisecondsDifference = date.getTime() - cachedChargers.time
    const minutesDifference = new Date(millisecondsDifference).getMinutes()

    if (minutesDifference < 2) {
      return false
    }
  }

  return true
}

/**
 * Retrieve cached chargers.
 */
export const getCachedChargers = () => defaults.chargers
