import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

const App = () => {
  return (
    <View style={styles.container}>
      <Text>plashka</Text>
      {/* Vobi Todo: What is this */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
})

export default App
