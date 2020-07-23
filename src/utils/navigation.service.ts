import { NavigationActions, StackActions } from 'react-navigation'
let _navigator: any = null

export default {
  setTopLevelNavigator: function(navigatorRef: any): void {
    _navigator = navigatorRef
  },

  navigate: function(routeName: string, params = {}): void {
    console.log(routeName, 'routeName')

    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    )
  },
  back: function(routeName: string, params = {}): void {
    _navigator.dispatch(NavigationActions.back({}))
  },

  reset: function(stackKey = 'root', routeName = '', params = {}): void {
    _navigator.dispatch(
      StackActions.reset({
        index: 0,
        key: stackKey,
        actions: [NavigationActions.navigate({ routeName, params })],
      }),
    )
  },
}
