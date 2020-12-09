import { NavigationActions, StackActions } from 'react-navigation'

let _navigator: any = null

export default {
  setTopLevelNavigator(navigatorRef: any): void {
    _navigator = navigatorRef
  },

  navigate(routeName: string, params = {}): void {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    )
  },
  back(routeName: string, params = {}): void {
    _navigator.dispatch(NavigationActions.back({}))
  },

  reset(stackKey = 'root', routeName = '', params = {}): void {
    _navigator.dispatch(
      StackActions.reset({
        index: 0,
        key: stackKey,
        actions: [NavigationActions.navigate({ routeName, params })],
      }),
    )
  },
}
