import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import images from 'assets/images'
import { BaseCheckboxFC } from './types'

const BaseCheckbox: BaseCheckboxFC = ({ active }) => (
  <View style={styles.checkboxImageContainer}>
    <Image
      source={active ? images.greenCheckmark : images.circle}
      style={styles.checkBoxImage}
    />
  </View>
)

export default React.memo(BaseCheckbox)

const styles = StyleSheet.create({
  checkboxImageContainer: {
    alignItems: 'flex-end',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    marginRight: 12,
  },
  checkBoxImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
})
