import {Sentry, Defaults, Ajax} from 'utils'
import {Exception} from '@sentry/react-native'
import {ChargerFilters, Charger, ChargersObject} from 'allTypes'
import i18next from 'i18next'

const Logger = (err: Exception | string | number): void => {
  if (__DEV__) {
    Sentry.captureException(err)
  } else {
    console.log(['Logger', err])
  }
}

const ConvertToChargerFilterParam = (
  filterChargerTypes: number[] = [],
  filterInput = '',
): object => {
  const param: ChargerFilters = {}

  if (filterChargerTypes[0] && !filterChargerTypes[1]) param.free = true
  if (filterChargerTypes[1] && !filterChargerTypes[0]) param.free = false

  if (filterChargerTypes[2] && !filterChargerTypes[3]) param.type = 'fast'
  if (filterChargerTypes[3] && !filterChargerTypes[2]) param.type = 'level2'

  if (filterChargerTypes[4] && !filterChargerTypes[5]) param.public = true
  if (filterChargerTypes[5] && !filterChargerTypes[4]) param.public = false
  if (filterInput !== '') param.text = filterInput
  return param
}

const GetFilteredCharger = (
  filterChargerTypes: number[] = [],
  filterInput = '',
  allChargers: Charger[] | null,
  setFilteredChargers: (chargers: Charger[]) => void,
): void => {
  const params: ChargerFilters = ConvertToChargerFilterParam(
    filterChargerTypes,
    filterInput,
  )
  if (Object.entries(params).length !== 0) {
    Ajax.get(
      '/chargers/?' +
        Object.keys(params)
          .map(key => key + '=' + params[key])
          .join('&'),
    )
      .then(({data}: ChargersObject) => {
        setFilteredChargers(data)
      }) // Vobi Todo: use async await
      .catch(() => {
        DisplayGeneralError()
      })
  } else setFilteredChargers(allChargers ?? [])
}

const DisplayGeneralError = (): void => {
  Defaults.dropdown?.alertWithType(
    'error',
    i18next.t('dropDownAlert.generalError'),
  )
}

export default {
  Logger,
  ConvertToChargerFilterParam,
  GetFilteredCharger,
  DisplayGeneralError,
}
