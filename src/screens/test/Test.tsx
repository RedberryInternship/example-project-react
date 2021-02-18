import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Test = () => (
  <SafeAreaView style={styles.container}>
    <Text>rame</Text>
  </SafeAreaView>
)

export default Test

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
  icon: {
    margin: 5,
  },
})
