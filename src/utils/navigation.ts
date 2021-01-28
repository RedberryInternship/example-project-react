/* eslint-disable no-underscore-dangle */
import { StatusBarStyle, StatusBar } from 'react-native'
import {
  NavigationContainerRef,
  NavigationState,
  CommonActions,
} from '@react-navigation/native'
import { determineTimePeriod } from 'utils/map'
import defaults from 'utils/defaults'
import references from 'utils/references'

const Navigation = {
  /**
   * Navigate to routes.
   */
  navigate(name: string, params = {}): void {
    references.navigator!?.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    )
  },

  /**
   * Go back.
   */
  back(): void {
    references.navigator?.dispatch(CommonActions.goBack())
  },

  /**
   * Reset navigation stack.
   */
  reset(stackKey = 'root', routeName = '', params = {}): void {
    references.navigator?.dispatch(
      CommonActions.reset({
        index: 0,
        key: stackKey,
        routes: [
          {
            name: routeName,
            params,
          },
        ],
      }),
    )
  },
}

export default Navigation

/**
 * Do things on routes change.
 */
export const onNavigationStateChange = (
  _: NavigationState,
  currentNavigationState: NavigationState,
) => {
  defaults.activeRoute = getCurrentRouteName(currentNavigationState)
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

/**
 * Get current route name.
 */
export const getCurrentRouteName = (state: NavigationState | any): string => {
  if ('index' in state) {
    return getCurrentRouteName(state.routes[state.index])
  }

  return state.routeName
}
