/* eslint-disable no-underscore-dangle */
import { StatusBarStyle, StatusBar } from 'react-native'
import {
  NavigationContainerComponent,
  NavigationActions,
  StackActions,
  NavigationState,
} from 'react-navigation'
import { determineTimePeriod } from 'utils/map'
import defaults from 'utils/defaults'

let navigator: NavigationContainerComponent | null = null

const Navigation = {
  /**
   * Navigate to routes.
   */
  navigate(routeName: string, params = {}): void {
    navigator!.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    )
  },

  /**
   * Go back.
   */
  back(): void {
    navigator!.dispatch(NavigationActions.back({}))
  },

  /**
   * Reset navigation stack.
   */
  reset(stackKey = 'root', routeName = '', params = {}): void {
    navigator!.dispatch(
      StackActions.reset({
        index: 0,
        key: stackKey,
        actions: [NavigationActions.navigate({ routeName, params })],
      }),
    )
  },
}

export default Navigation

/**
  * Set navigation reference.
  */
export const setNavigationReference = (navigatorRef: NavigationContainerComponent): void => {
  navigator = navigatorRef
}

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
