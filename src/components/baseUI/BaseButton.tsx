/* eslint-disable no-unused-vars */
import React, {ReactElement} from 'react'
import {
  StyleSheet,
  StyleProp,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  Image,
  ViewStyle,
  View,
  ActivityIndicator,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import LinearGradient from 'react-native-linear-gradient'
import BaseNativeTouchable from 'components/baseUI/BaseNativeTouchable'
import BaseText from 'components/baseUI/BaseText'
import {Const, Colors, GNOME} from 'utils'

type Button = {
  onPress: () => void
  text: string
  textStyle?: TextStyle
  image?: ImageSourcePropType
  style?: StyleProp<ViewStyle>
  imageStyle?: ImageStyle
  isImageRight?: boolean
  loading?: boolean
}

const BaseButton = ({
  onPress,
  style,
  image,
  imageStyle,
  textStyle,
  text,
  isImageRight,
  loading,
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
      style={[styles.style, style]}
    >
      <View style={{flex: 1, backgroundColor: '#ffffff00'}}>
        <BaseNativeTouchable
          onPress={onPress}
          borderless={false}
          style={[styles.touchableStyle]}
          enabled={!loading}
        >
          {loading ? (
            <ActivityIndicator
              color={'green'}
              size="large"
            />
          ) : (
            <>
              {isImageRight ? btnImage : null}
              <BaseText style={[styles.textStyle, textStyle]}>
                {t(text)}
              </BaseText>
              {!isImageRight ? btnImage : null}
            </>
          )}
        </BaseNativeTouchable>
      </View>
    </LinearGradient>
  )
}

export default React.memo(BaseButton)

const styles = StyleSheet.create({
  style: {
    width: Const.Width - 48,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'stretch',
    elevation: 1,
    marginHorizontal: 24,
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
    textAlignVertical: 'bottom',
    fontWeight: 'bold',
    fontFamily: GNOME.HELV_HVEX,
    marginHorizontal: 4,
    textAlign: 'center',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
})
