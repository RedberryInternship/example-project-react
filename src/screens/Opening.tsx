import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors, Font } from 'utils'
import { BaseText } from 'components'

const Opening = () => (
  <View style={styles.container}>
    <BaseText style={styles.text}>Welcome to E-Space</BaseText>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryBackground,
  },
  text: {
    fontFamily: Font.HELV_HVEX,
  },
})

export default Opening
