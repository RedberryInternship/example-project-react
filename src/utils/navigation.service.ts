import { NavigationActions, StackActions } from 'react-navigation'
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
        actions: [NavigationActions.navigate({ routeName, params })],
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

// Vobi Todo: we have written our service this may be useful

// import { StackActions, NavigationActions, DrawerActions } from 'react-navigation'

// let NavigatorRef

// export function setNavigator(nav) {
//   NavigatorRef = nav
// }

// // Drawer Actions
// export function closeDrawer() {
//   NavigatorRef.dispatch(DrawerActions.closeDrawer())
// }

// export function openDrawer() {
//   NavigatorRef.dispatch(DrawerActions.openDrawer())
// }

// export function Navigate(routeName, params = {}) {
//   const navigateAction = NavigationActions.navigate({
//     routeName,
//     params: {
//       canGoBack: false,
//       ...params,
//     },
//     action: NavigationActions.navigate({ routeName }),
//   })

//   NavigatorRef.dispatch(navigateAction)
// }

// export function Replace(routeName, params = {}) {
//   NavigatorRef.dispatch(
//     StackActions.reset({
//       index: 0,
//       actions: [NavigationActions.navigate({
//         type: 'Navigation/NAVIGATE',
//         routeName,
//         params: {
//           canGoBack: false,
//           ...params,
//         },
//         immediate: true,
//       })],
//     }),
//   )
// }

// // Navigation Actions
// export function Push(routeName, params = {}) {
//   NavigatorRef.dispatch(
//     NavigationActions.navigate({
//       type: 'Navigation/NAVIGATE',
//       routeName,
//       params: {
//         canGoBack: true,
//         ...params,
//       },
//     }),
//   )
// }

// export function Pop() {
//   NavigatorRef.dispatch(
//     NavigationActions.back(),
//   )
// }

// Vobi Todo: when using it

// <AppContainer
//   ref={(navigatorRef) => {
//     setNavigator(navigatorRef)
//   }}
// />

// import { Navigate } from 'navigation'
// Navigate('login')
