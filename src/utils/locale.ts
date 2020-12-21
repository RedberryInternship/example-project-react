import AsyncStorage from '@react-native-community/async-storage'
import { Locale } from 'types'
import {
  DisplayDropdownWithError,
  remoteLogger,
} from './inform'

/**
 * Default locale.
 */
const defaultLocale: Locale = 'ka'

/**
 * Get locale from async storage.
 */
const getLocale = async () => {
  try {
    const savedLocale: Locale = await AsyncStorage.getItem('locale') as Locale

    if (savedLocale === '') {
      setLocale(defaultLocale)

      return defaultLocale
    }

    return savedLocale
  } catch (error) {
    DisplayDropdownWithError()
    remoteLogger(error)
    return defaultLocale
  }
}

/**
 * Set locale into async storage.
 */
const setLocale = (locale: Locale) => {
  locale && AsyncStorage.setItem('locale', locale)
}

export {
  getLocale,
  setLocale,
}
