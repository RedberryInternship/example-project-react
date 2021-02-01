import { refreshAndCacheChargers } from 'helpers/chargers'
import { remoteLogger } from 'utils/inform'
import {
  ChargerFilters,
  ConnectorTypes,
  ChargerStatus,
  GetAllChargerResponseType,
  Charger,
} from 'types'
import defaults from 'utils/defaults'

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

/**
 * Filter whitelisted chargers.
 */
export const hideWhitelistedChargers = (chargers: Charger[]) => chargers.filter((charger) => {
  /**
   * if charger is not hidden show it to the user.
   */
  if (!charger.hidden) {
    return true;
  }

  /**
   * If user is not authenticated and
   * charger is hidden, don't show.
   */
  if (defaults.authStatus === 'failed') {
    return false;
  }

  /**
   * If user is authenticated and charger is hidden
   * with user's phone_number in its whitelist,
   * in that case show charger.
   */
  const notIn = charger.whitelist.every(({ phone }) => phone !== defaults.userDetail?.phone_number)

  if (notIn) {
    return false;
  }

  /**
   * If it happens that user's phone number is in the
   * charger's whitelist then let the user
   * see this charger.
   */
  return true
})
