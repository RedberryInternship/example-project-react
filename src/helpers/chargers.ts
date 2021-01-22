import services from 'services'
import defaults from 'utils/defaults'
import { ChargersResponseWithTime, GetAllChargerResponseType, Charger } from 'types'
import { hideWhitelistedChargers } from 'helpers/chargerFilter'
import { remoteLogger } from 'utils/inform'
import images from 'assets/images'
import { domain } from 'utils/const'

/**
 * If cached chargers are expired refresh them and return,
 * or else cache and return fresh ones.
 */
export const refreshAndCacheChargers = async () => {
  const haveExpired = haveLocalChargersExpired()

  if (haveExpired) {
    const retrievedChargers = await retrieveChargers()
    retrievedChargers.data = hideWhitelistedChargers(retrievedChargers.data)
    retrievedChargers.data = retrievedChargers.data.map(addDistanceField)
    retrievedChargers.data = retrievedChargers.data.sort(sortByDistance)

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

const retrieveChargers = async () => {
  try {
    return await services.getChargers();
  } catch (e) {
    remoteLogger(e)
    return {
      data: [] as Charger[],
    } as GetAllChargerResponseType;
  }
}

/**
 * Calculate distance.
 */
export const calculateDistance = (lat: number, lng: number): number => {
  const myLat = defaults.location?.lat
  const myLng = defaults.location?.lng

  if (typeof (myLat) === 'number' && typeof (myLng) === 'number') {
    return Math.sqrt((myLat - +lat) ** 2 + (myLng - +lng) ** 2)
  }

  return 1000
}

/**
 * Calculate distance callback for map.
 */
export const addDistanceField = (el: Charger) => (
  {
    ...el,
    distance: calculateDistance(+el.lat, +el.lng),
  }
)

/**
 * Sort function for sorting by distance.
 */
export const sortByDistance = (a: Charger, b: Charger) => a.distance! - b.distance!

/**
 * Get image for chargers.
 */
export const getImage = (image: string | null) => {
  if (image === null) {
    return images.defaultCharger
  }

  return {
    uri: `${domain}/storage/${image}`,
  }
}
