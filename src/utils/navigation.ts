/* eslint-disable no-underscore-dangle */
import { StatusBarStyle, StatusBar } from 'react-native'
import { NavigationContainerRef } from '@react-navigation/native'
import { determineTimePeriod } from 'utils/map'
import defaults from 'utils/defaults'
import references from 'utils/references'

/**
 * Do things on routes change.
 */
export const onNavigationStateChange = () => {
  StatusBar.setBarStyle(determineNavigationTheme(), true)
}

export const setNavigatorRef = (ref: NavigationContainerRef) => {
  references.navigator = ref
}

/**
 * Determine navigation theme.
 */
export const determineNavigationTheme = (): StatusBarStyle => {
  const { activeRoute } = defaults
  if (activeRoute !== 'Home' && activeRoute !== 'HomeTabNavigation') {
    return 'light-content'
  }
  return determineTimePeriod() ? 'dark-content' : 'light-content'
}
