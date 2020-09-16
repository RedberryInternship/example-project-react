import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Colors, GNOME} from 'utils'
import {BaseText} from 'components'

const App = () => {
  return (
    <View style={styles.container}>
      {/* <BaseText style={styles.text}>ergweg</BaseText> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryBackground,
  },
  text: {
    fontFamily: GNOME.HELV_HVEX,
  },
})

export default App
