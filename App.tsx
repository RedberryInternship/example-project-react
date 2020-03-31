import React, { useMemo, createContext } from 'react'
import { StatusBar } from 'react-native'
import { Navigation } from './src'
import { CustomModal } from 'components'
import DropdownAlert from 'react-native-dropdownalert'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Defaults, useFirebase } from 'utils'
import { useRoot } from 'hooks'

console.disableYellowBox = true

if (__DEV__) {
} else {
  // Vobi Todo: What is this
  //Redberry : trick, I overide console.log on producion for not blocking js thread
  // Vobi Todo: you should use logger like this

  // import * as Sentry from '@sentry/browser'

  // const exception = (err) => {
  //   if (process.env.REACT_APP_STAGE !== 'production') {
  //     console.error(err)
  //   } else {
  //     Sentry.captureException(err)
  //   }
  // }

  // const message = (message) => {
  //   if (process.env.REACT_APP_STAGE !== 'production') {
  //     console.error(message)
  //   } else {
  //     Sentry.captureMessage(message)
  //   }
  // }

  // const log = (msg) => {
  //   if (process.env.REACT_APP_STAGE !== 'production') {
  //     console.log(msg)
  //   }
  // }

  // export default {
  //   log,
  //   message,
  //   exception
  // }
  console.log = () => { }
}
export const AppContext = createContext()

const App = (): React.ReactElement => {
  const hook = useRoot()

  return useMemo(
    () => (
      <SafeAreaProvider>
        <AppContext.Provider
          value={{ state: hook.state, dispatch: hook.dispatch }}>
          <Navigation
            ref={ref => hook.setNavigationTopLevelElement(ref)}
            screenProps={{ token: Defaults.token }}
            onNavigationStateChange={(_, state) => {
              Defaults.activeRoute = hook.getCurrentRoute(state)
              console.log('====================================')
              console.log(Defaults.activeRoute, 'Defaults.activeRout state')
              console.log('====================================')
            }}
          />
        </AppContext.Provider>

        <StatusBar barStyle="light-content" />
        <DropdownAlert
          translucent={true}
          useNativeDriver={true}
          inactiveStatusBarBackgroundColor={'transparent'}
          inactiveStatusBarStyle={hook.dropDownInactiveBarColor()}
          ref={ref => (Defaults.dropdown = ref)}
          testID={'dropdownAlert'}
          titleStyle={{ fontSize: 14, color: 'white' }}
          imageStyle={{
            marginHorizontal: 8,
            alignSelf: 'center',
            resizeMode: 'contain',
          }}
        />
        <CustomModal ref={Defaults.modal} />
      </SafeAreaProvider>
    ),
    [hook.appReady, hook.state],
  )
}

export default App
