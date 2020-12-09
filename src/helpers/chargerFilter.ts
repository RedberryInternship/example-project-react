import services from 'services'
import AsyncStorage from '@react-native-community/async-storage'
import { DisplayDropdownWithError, remoteLogger } from 'helpers/inform'
import { ChargerFilters, ChargerStatus, ConnectorTypes } from 'utils/enums'
import {
  GetAllChargerResponseType,
  ChargersResponseWithTime,
  Charger,
} from '../../@types/allTypes.d'

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
const haveLocalChargersExpired = async () => {
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
const getCachedChargers = async () => {
  const storedChargers = await AsyncStorage.getItem('storedChargers')
  if (storedChargers) {
    return JSON.parse(storedChargers) as ChargersResponseWithTime
  }
  return null
}

/**
 * Get chargers from server and filter
 * based on input text.
 */
export const GetFilteredCharger = async (
  selectedFilters: boolean[],
  filterInput = '',
): Promise<Charger[]> => {
  try {
    const { data } = await refreshAndCacheChargers() as GetAllChargerResponseType
    return !isSearchBarEmpty(filterInput)
      ? searchChargers(filterInput, data)
      : filterChargers(selectedFilters, data)
  } catch (error) {
    remoteLogger(error)
    DisplayDropdownWithError()
    return []
  }
}

/**
 * determine if search bar is empty.
 */
const isSearchBarEmpty = (text: string): boolean => text === ''

/**
 * Search charger based on input
 * text on retrieved chargers.
 */
const searchChargers = (text: string, data: Charger[]) => data.filter((charger) => {
  const stringifiedCharger = JSON.stringify(charger).toLowerCase()
  return stringifiedCharger.toLowerCase().includes(text.toLowerCase())
})

/**
 * Filter chargers for bottom chargers filter.
 */
const filterChargers = (
  selectedFilters: boolean[],
  data: Charger[],
): Charger[] => data.filter((charger) => shouldAppear(charger, selectedFilters))

/**
 * Determine if charger should appear in
 * search result.
 */
const shouldAppear = (charger: Charger, selectedFilters: boolean[]): boolean => {
  const chargerCharacteristics = determineChargerCharacteristics(charger)

  return chargerCharacteristics.every((value, index) => {
    const appliedFilter = selectedFilters[index]
    /**
     * If any filter that is applied resembles charger
     * characteristics return true, if not false.
     * In any other case return false.
     */
    return appliedFilter ? value === appliedFilter : true
  })
}

/**
 * determine charger characteristics
 * appropriate to filter.
 */
const determineChargerCharacteristics = (charger: Charger): Array<boolean> => {
  const characteristics = Array(6).fill(false)

  characteristics[ChargerFilters.FREE] = determine.isChargerFree(charger)
  characteristics[ChargerFilters.CHARGING] = determine.isChargerCharging(charger)
  characteristics[ChargerFilters.FAST] = determine.isChargerFast(charger)
  characteristics[ChargerFilters.LVL2] = determine.isChargerLvl2(charger)
  characteristics[ChargerFilters.PRIVATE] = determine.isChargerPrivate(charger)
  characteristics[ChargerFilters.PUBLIC] = determine.isChargerPublic(charger)

  return characteristics
}

/**
 * Helper for determining if charger is free,
 * currently charging, is it fast or lvl 2 type,
 * or is it private or public.
 */
export const determine = {
  isChargerFree: (charger: Charger): boolean => charger.status === ChargerStatus.ACTIVE,
  isChargerCharging: (charger: Charger): boolean => charger.status === ChargerStatus.CHARGING,
  isChargerFast: (charger: Charger): boolean => {
    const connectorName = charger.connector_types[0].name

    return connectorName === ConnectorTypes.CHADEMO || connectorName === ConnectorTypes.COMBO_2
  },
  isChargerLvl2: (charger: Charger):
    boolean => charger.connector_types[0].name === ConnectorTypes.TYPE_2,
  isChargerPrivate: (charger: Charger): boolean => !charger.public,
  isChargerPublic: (charger: Charger): boolean => !!charger.public,
}
