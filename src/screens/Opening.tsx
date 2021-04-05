import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Colors from 'utils/colors'
import Font from 'utils/font'
import BaseText from 'components/BaseText'
import images from 'assets/images'

const Opening = () => (
  <View style={styles.container}>
    <Image source={images.logo} style={styles.image} resizeMode="contain" />
    <BaseText style={styles.text} testID="title">Welcome to E-Space</BaseText>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryBackground,
  },
  image: {
    width: 100,
  },
  text: {
    fontFamily: Font.HELV_HVEX,
    marginBottom: 50,
  },
})

export default Opening
