import React, { useMemo } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native'
import { Colors, Const } from 'utils'
import { BaseNativeTouchable, BaseText } from 'components'
import images from 'assets/images'
import { MainSearchItemFC } from './types'

const MainSearchItem: MainSearchItemFC = (
  {
    mainTitle,
    onPress,
    text,
  },
) => {
  const child = useMemo(
    () => (
      <View style={styles.container}>
        <Image source={images.mapPin2} style={styles.image} />
        <View style={styles.textContainer}>
          <BaseText numberOfLines={1} style={styles.mainTitleText}>
            {mainTitle}
          </BaseText>
          <BaseText numberOfLines={1} style={styles.addressText}>
            {text}
          </BaseText>
        </View>
      </View>
    ),
    [mainTitle, text],
  )

  if (Const.platformIOS) { return <TouchableOpacity onPress={onPress}>{child}</TouchableOpacity> }
  return (
    <BaseNativeTouchable onPress={onPress} borderless={false}>
      {child}
    </BaseNativeTouchable>
  )
}

export default MainSearchItem

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    marginTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1C3748',
  },
  image: {
    width: 23,
    height: 23,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  mainTitleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 22,
  },
  addressText: {
    fontSize: 13,
    color: Colors.primaryGray,
  },
})
