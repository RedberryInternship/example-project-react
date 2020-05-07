import React, {useMemo, createContext} from 'react'
import {StatusBar} from 'react-native'
import {Navigation} from './src'
import {CustomModal} from 'components'
import DropdownAlert from 'react-native-dropdownalert'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {Defaults} from 'utils'
import {useRoot} from 'hooks'

console.disableYellowBox = true

if (__DEV__) {
} else {
  console.log = () => {}
}
export const AppContext = createContext({})

const App = (): React.ReactElement => {
  const {
    state,
    dispatch,
    setNavigationTopLevelElement,
    getCurrentRoute,
    dropDownInactiveBarColor,
    appReady,
  } = useRoot()

  return useMemo(
    () => (
      <SafeAreaProvider>
        <AppContext.Provider value={{state, dispatch}}>
          <Navigation
            ref={(ref) => setNavigationTopLevelElement(ref)}
            screenProps={{
              token: Defaults.token,
              chargingState: state.chargingState,
            }}
            onNavigationStateChange={(_, state) => {
              Defaults.activeRoute = getCurrentRoute(state)
              StatusBar.setBarStyle(dropDownInactiveBarColor(), true)
              console.log('====================================')
              console.log(
                Defaults.activeRoute,
                state,
                'Defaults.activeRout state',
              )
              console.log('====================================')
            }}
          />
        </AppContext.Provider>
        <DropdownAlert
          translucent={true}
          useNativeDriver={true}
          inactiveStatusBarBackgroundColor={'transparent'}
          onClose={() =>
            StatusBar.setBarStyle(dropDownInactiveBarColor(), true)
          }
          ref={(ref) => (Defaults.dropdown = ref)}
          testID={'dropdownAlert'}
          titleStyle={{fontSize: 14, color: 'white'}}
          imageStyle={{
            marginHorizontal: 8,
            alignSelf: 'center',
            resizeMode: 'contain',
          }}
          titleNumOfLines={2}
        />
        <CustomModal ref={Defaults.modal} />
      </SafeAreaProvider>
    ),
    [appReady, state],
  )
}

export default App
