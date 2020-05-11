import React, {ReactElement} from 'react'
import {
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'

import {Colors} from 'utils'
import {BaseNativeTouchable} from 'components'
import images from 'assets/images'

type MainSearchItemProps = {
  mainTitle: string
  text: string
  onPress: () => void
}
const MainSearchItem = ({
  mainTitle,
  text,
  onPress,
}: MainSearchItemProps): ReactElement => {
  const child = ( // Vobi Todo: what does child mean
    <View style={styles.container}>
      <Image source={images.mapPin2} style={styles.image} />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.mainTitleText}>
          {mainTitle}
        </Text>
        <Text numberOfLines={1} style={styles.addressText}>
          {text}
        </Text>
      </View>
    </View>
  )

  // Vobi Todo:
  // if (Platform.OS === 'ios') return <TouchableOpacity onPress={onPress}>{child}</TouchableOpacity>
  // return <BaseNativeTouchable onPress={onPress} borderless={false}>
  //   {child}
  // </BaseNativeTouchable>
  return (
    <>
      {Platform.OS === 'ios' ? ( // Vobi Todo: in this moments you should split returns it is more readable
        <TouchableOpacity onPress={onPress}>{child}</TouchableOpacity>
      ) : (
        <BaseNativeTouchable onPress={onPress} borderless={false}>
          {child}
        </BaseNativeTouchable>
      )}
    </>
  )
}

export default MainSearchItem

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    backgroundColor: 'transparent',
    margin: 16,
    height: 40,
    flexDirection: 'row',
  },
  image: {
    width: 23,
    height: 23,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
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
    lineHeight: 22,
  },
})
