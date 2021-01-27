import 'react-native-gesture-handler'
import React from 'react'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import store from 'state/store'
import StartUpLayer from 'StartUpLayer'

console.disableYellowBox = true

const App = (): React.ReactElement => (
  <Provider store={store}>
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StartUpLayer />
    </SafeAreaProvider>
  </Provider>
)

export default App
