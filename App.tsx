import React, { useMemo, createContext, Dispatch } from 'react'
import { StatusBar } from 'react-native'
import { Navigation } from './src'
import { CustomModal } from 'components'
import DropdownAlert from 'react-native-dropdownalert'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import { Defaults, useFirebase } from 'utils'
import { useRoot } from 'hooks'
import { ChargerActions, ChargerAction } from 'hooks/actions/chargerActions'
import { chargerInitialState } from 'hooks/reducers/chargerReducer'
import { ChargerState } from 'allTypes'

console.disableYellowBox = true

if (__DEV__) {
} else {
  console.log = () => {}
}

export const ChargerContext = createContext<{
  state: ChargerState
  dispatch: Dispatch<ChargerAction>
}>({ state: chargerInitialState, dispatch: () => null })

export const AppContext = createContext({})

const App = (): React.ReactElement => {
  const {
    state,
    dispatch,
    setNavigationTopLevelElement,
    getCurrentRoute,
    dropDownInactiveBarColor,
    appReady,
    charger,
    dispatchCharger,
  } = useRoot()

  return useMemo(
    () => (
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AppContext.Provider value={{ state, dispatch }}>
          <ChargerContext.Provider
            value={{ state: charger, dispatch: dispatchCharger }}
          >
            <Navigation
              ref={(ref) => setNavigationTopLevelElement(ref)}
              screenProps={{
                token: Defaults.token,
                chargingState: charger.chargingState,
              }}
              theme={'dark'}
              onNavigationStateChange={(_, state) => {
                Defaults.activeRoute = getCurrentRoute(state)
                StatusBar.setBarStyle(dropDownInactiveBarColor(), true)
                console.log('====================================')
                console.log(
                  Defaults.activeRoute,
                  // state,
                  'Defaults.activeRout state',
                )
                console.log('====================================')
              }}
            />
          </ChargerContext.Provider>
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
          titleStyle={{ fontSize: 14, color: 'white' }}
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
    [appReady, state, charger],
  )
}

export default App
