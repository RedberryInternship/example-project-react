import React from 'react'
import {
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import LinearGradient from 'react-native-linear-gradient'
import {
  BaseNativeTouchable,
  BaseText,
} from 'components'
import { Const, Colors, Font } from 'utils'
import { BaseButtonFC } from './types'

const BaseButton: BaseButtonFC = (
  {
    onPress,
    style,
    image,
    imageStyle,
    textStyle,
    text,
    isImageRight,
    loading,
  },
) => {
  const { t } = useTranslation()
  const btnImage = image && (
    <Image
      source={image}
      style={[{ width: 18, height: 18, resizeMode: 'contain' }, imageStyle]}
    />
  )

  return (
    <LinearGradient
      colors={
        style && style.backgroundColor
          ? [style.backgroundColor, style.backgroundColor]
          : ['#009AF0', '#008AEE']
      }
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={[styles.style, style]}
    >
      <View style={styles.innerContainer}>
        <BaseNativeTouchable
          onPress={onPress}
          borderless={false}
          style={[styles.touchableStyle]}
          enabled={!loading}
        >
          {loading
            ? (
              <ActivityIndicator
                color="green"
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
  innerContainer: {
    flex: 1,
    backgroundColor: '#ffffff00',
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
    fontFamily: Font.HELV_HVEX,
    marginHorizontal: 4,
    textAlign: 'center',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
})
