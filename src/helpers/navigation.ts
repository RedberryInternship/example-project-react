import { StatusBarStyle } from 'react-native'
import { NavigationContainerComponent } from 'react-navigation'
import NavigationActions from 'utils/navigation.service'
import { determineTimePeriod } from 'utils/mapAndLocation/mapFunctions'
import defaults from 'utils/defaults'

/**
 * Set navigation reference.
 */
export const setNavigationReference = (ref: NavigationContainerComponent | null) => {
  NavigationActions.setTopLevelNavigator(ref)
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
