import React, { useMemo } from 'react'
import { StatusBar } from 'react-native'
import { Navigation } from './src'
import { CustomModal } from 'components'
import DropdownAlert from 'react-native-dropdownalert'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import { Defaults, Helpers } from 'utils'
import { useRoot } from 'hooks'
import AppContext from 'hooks/contexts/app'
import ChargerContext from 'hooks/contexts/charger'

console.disableYellowBox = true

const App = (): React.ReactElement => {
  const {
    state,
    dispatch,
    setNavigationTopLevelElement,
    dropDownInactiveBarColor,
    appReady,
    charger,
    dispatchCharger,
  } = useRoot()

  Helpers.Logger(["App - Component"]);

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
                StatusBar.setBarStyle(dropDownInactiveBarColor(), true)
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
