import {NavigationActions, StackActions} from 'react-navigation'
import {Defaults} from 'utils'

let _navigator: any = null

export default () => {
  function setTopLevelNavigator(navigatorRef: any) {
    _navigator = navigatorRef
  }

  function navigate(routeName: string, params = {}) {
    console.log(routeName, 'routeName')

    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    )
  }

  // add other navigation functions that you need and export them
  function back(routeName: string, params = {}) {
    _navigator.dispatch(NavigationActions.back({}))
  }

  function reset(routeName = '', params = {}) {
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
