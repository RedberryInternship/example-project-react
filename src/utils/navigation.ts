/* eslint-disable no-underscore-dangle */
import { StatusBarStyle, StatusBar } from 'react-native'
import { NavigationState } from '@react-navigation/native'
import { determineTimePeriod } from 'utils/map'
import defaults from 'utils/defaults'

/**
 * Do things on routes change.
 */
export const onNavigationStateChange = (
  currentNavigationState: NavigationState | undefined,
) => {
  // defaults.activeRoute = getCurrentRouteName(currentNavigationState)

  StatusBar.setBarStyle(determineNavigationTheme(), true)
}

/**
 * Determine navigation theme.
 */
export const determineNavigationTheme = (): StatusBarStyle => {
  if (defaults.activeRoute !== 'Home') {
    return 'light-content'
  }
  return determineTimePeriod() ? 'dark-content' : 'light-content'
}
