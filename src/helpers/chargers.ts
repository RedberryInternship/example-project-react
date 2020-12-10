// import services from 'services'
import services from 'services'
import AsyncStorage from '@react-native-community/async-storage'
import { ChargersResponseWithTime } from 'types'

/**
 * If cached chargers are expired refresh them and return,
 * or else cache and return fresh ones.
 */
export const refreshAndCacheChargers = async () => {
  const haveExpired = await haveLocalChargersExpired()

  if (haveExpired) {
    const retrievedChargers = await services.getChargers()
    const now = new Date().getTime()
    const dataToCache = {
      data: retrievedChargers,
      time: now,
    }

    AsyncStorage.setItem('storedChargers', JSON.stringify(dataToCache))
    return retrievedChargers
  }

  const cachedChargers = await getCachedChargers()
  return cachedChargers?.data
}

/**
 * Determine if cached chargers are expired.
 */
export const haveLocalChargersExpired = async () => {
  const date = new Date()
  const cachedChargers = await getCachedChargers()

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
export const getCachedChargers = async () => {
  const storedChargers = await AsyncStorage.getItem('storedChargers')
  if (storedChargers) {
    return JSON.parse(storedChargers) as ChargersResponseWithTime
  }
  return null
}
