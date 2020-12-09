import React from 'react'
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import { OnMapRoundButtonFC } from './types'

const OnMapRoundButton: OnMapRoundButtonFC = (
  {
    imageStyle,
    onPress,
    style,
    image,
  },
) => (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={image} style={[styles.image, imageStyle]} />
    </TouchableOpacity>
  )

export default React.memo(OnMapRoundButton)

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    elevation: 1,
    backgroundColor: '#008AEE',
  },
  image: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
})
