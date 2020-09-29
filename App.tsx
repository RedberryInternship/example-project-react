import React from 'react'

import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import ContextLayer from 'ContextLayer'
import StartUpLayer from 'StartUpLayer'

console.disableYellowBox = true

const App = (): React.ReactElement => {
  console.log(['App - Layer'])
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ContextLayer>
        <StartUpLayer />
      </ContextLayer>
    </SafeAreaProvider>
  )
}

export default App
