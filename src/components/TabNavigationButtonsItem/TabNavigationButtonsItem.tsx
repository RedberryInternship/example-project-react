import React from 'react'
import { Image, StyleSheet } from 'react-native'
import BaseNativeTouchable from 'components/BaseNativeTouchable'
import Colors from 'utils/colors'
import { TabNavigationButtonsItemFC } from './types'

const TabNavigationButtonsItem: TabNavigationButtonsItemFC = (
  {
    imageStyle,
    navigate,
    active,
    image,
    testID,
  },
) => (
  <BaseNativeTouchable onPress={navigate} style={styles.baseNativeTouchable} testID={testID}>
    <Image
      source={image}
      style={[
        styles.image,
        imageStyle,
        { tintColor: active ? Colors.secondaryBlue : Colors.primaryGray },
      ]}
    />
  </BaseNativeTouchable>
)

export default TabNavigationButtonsItem

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  baseNativeTouchable: {
    height: '80%',
    justifyContent: 'center',
  },
})
