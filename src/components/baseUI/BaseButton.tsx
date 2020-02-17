/* eslint-disable no-unused-vars */
import React, {ReactElement} from 'react'
import {
  StyleSheet,
  StyleProp,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  Text,
  Image,
  ViewStyle,
  View,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Const, Colors} from 'utils'
import LinearGradient from 'react-native-linear-gradient'
import {BaseNativeTouchable} from 'components'

type Button = {
  onPress: () => void
  text: string
  textStyle?: TextStyle
  image?: ImageSourcePropType
  style?: StyleProp<ViewStyle>
  imageStyle?: ImageStyle
  isImageRight?: boolean
}

const BaseButton = ({
  onPress,
  style,
  image,
  imageStyle,
  textStyle,
  text,
  isImageRight,
}: Button): ReactElement => {
  const {t} = useTranslation()

  const btnImage = image && (
    <Image
      source={image}
      style={[{width: 18, height: 18, resizeMode: 'contain'}, imageStyle]}
    />
  )

  return (
    <LinearGradient
      colors={
        style && style.backgroundColor
          ? [style.backgroundColor, style.backgroundColor]
          : ['#009AF0', '#008AEE']
      }
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      style={[styles.style, style]}>
      <View style={{flex: 1, backgroundColor: '#ffffff00'}}>
        <BaseNativeTouchable
          onPress={onPress}
          borderless={false}
          style={[styles.touchableStyle]}>
          <>
            {isImageRight ? btnImage : null}
            <Text style={[styles.textStyle, textStyle]}>{t(text)}</Text>
            {!isImageRight ? btnImage : null}
          </>
        </BaseNativeTouchable>
      </View>
    </LinearGradient>
  )
}

export default BaseButton

const styles = StyleSheet.create({
  style: {
    width: Const.Width - 48,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'stretch',
    elevation: 1,
    marginHorizontal: 24,
    marginTop: Const.NotchHeight + 16,
  },
  touchableStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    flex: 1,
    flexGrow: 1,
  },
  textStyle: {
    color: Colors.primaryWhite,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: 'bold',
    marginHorizontal: 4,
    textAlign: 'center',
    alignSelf: 'center',
  },
})
