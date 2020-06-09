import React, {ReactElement} from 'react'
import {
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  TouchableOpacity,
  ImageStyle,
} from 'react-native'

type OnMapRoundButtonProps = {
  onPress: () => void
  style: StyleProp<ViewStyle>
  image: ImageSourcePropType
  imageStyle?: StyleProp<ImageStyle>
}

const OnMapRoundButton = ({
  onPress,
  style,
  image,
  imageStyle,
}: OnMapRoundButtonProps): ReactElement => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={image} style={[styles.image, imageStyle]} />
    </TouchableOpacity>
  )
}

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
