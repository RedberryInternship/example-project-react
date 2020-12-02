import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import colors from 'utils/colors'
import {
  BaseNativeTouchable,
  BaseText,
} from 'components'
import { LocaleButtonItemFC } from 'screens/drawer/drawer/types'

const BaseLocaleButton: LocaleButtonItemFC = (
  {
    textStyle,
    onPress,
    style,
    text,
  }
) => (
    <View style={[styles.container, style]}>
      <BaseNativeTouchable onPress={onPress}>
        <View style={[styles.localeUiContainer]}>
          <BaseText style={[styles.localeText, textStyle]}>{text}</BaseText>
        </View>
      </BaseNativeTouchable>
    </View>
  )

export default BaseLocaleButton

const styles = StyleSheet.create({
  container: {
    width: 50,
  },
  localeUiContainer: {
    width: 50,
    height: 50,
    backgroundColor: colors.primaryBlue,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  localeText: {
    color: colors.primaryWhite,
  },
})
