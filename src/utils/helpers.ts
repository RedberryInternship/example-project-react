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
    ) // Vobi Todo: you are mapping twice here one by map and one by join you should avoid O(n2) algorithms
      // try using this helper function
      // const stringify = () => {
      //   let result = ''
      //   for (const key in obj) {
      //     result += `${key}=${obj[key]}&`
      //   }
      //   return result.slice(0, -1)
      // }
      .then(({data}: ChargersObject) => {
        setFilteredChargers(data)
      }) // Vobi Todo: use async await
      .catch(() => {
        DisplayDropdownWithError()
      })
  } else setFilteredChargers(allChargers ?? [])
}

const DisplayDropdownWithError = (
  title: string | undefined = undefined,
  text: string | undefined = undefined,
): void => {
  Defaults.dropdown?.alertWithType(
    'error',
    i18next.t(title ?? 'dropDownAlert.generalError'),
    i18next.t(text ?? ''),
  )
}

const DisplayDropdownWithSuccess = (
  title: string | undefined = undefined,
  text: string | undefined = undefined,
): void => {
  Defaults.dropdown?.alertWithType(
    'success',
    i18next.t(title ?? 'dropDownAlert.generalSuccess'),
    (!!text && i18next.t(text)) ?? null,
  )
}

export default {
  Logger,
  ConvertToChargerFilterParam,
  GetFilteredCharger,
  DisplayDropdownWithSuccess,
  DisplayDropdownWithError,
}
