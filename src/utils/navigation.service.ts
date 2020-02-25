import {NavigationActions, StackActions} from 'react-navigation'
let _navigator: any = null

export default () => {
  function setTopLevelNavigator(navigatorRef: any): void {
    _navigator = navigatorRef
  }

  function navigate(routeName: string, params = {}): void {
    console.log(routeName, 'routeName')

    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    )
  }

  // add other navigation functions that you need and export them
  function back(routeName: string, params = {}): void {
    _navigator.dispatch(NavigationActions.back({}))
  }

  function reset(routeName = '', params = {}): void {
    _navigator.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName, params})],
      }),
    )
  }

  return {
    navigate,
    back,
    setTopLevelNavigator,
    reset,
    _navigator,
  }
}
