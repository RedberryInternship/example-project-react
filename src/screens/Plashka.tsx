import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Colors} from 'utils'

const App = () => {
  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryBackground,
  },
})

export default App
