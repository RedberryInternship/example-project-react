import React, {ReactElement} from 'react'

import {View, StyleSheet, ViewStyle, TextStyle} from 'react-native'

import {Colors} from 'utils'
import {BaseNativeTouchable, BaseText} from 'components'

type LocaleButton = {
  onPress: () => void
  text: string
  style?: ViewStyle
  textStyle?: TextStyle
}

const BaseLocaleButton = ({
  onPress,
  style,
  text,
  textStyle,
}: LocaleButton): ReactElement => {
  return (
    <View style={[{width: 50}, style]}>
      <BaseNativeTouchable onPress={onPress}>
        <View style={[styles.localeUiContainer]}>
          <BaseText style={[styles.localeText, textStyle]}>{text}</BaseText>
        </View>
      </BaseNativeTouchable>
    </View>
  )
}

export default BaseLocaleButton

const styles = StyleSheet.create({
  localeUiContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primaryBlue,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  localeText: {
    color: Colors.primaryWhite,
  },
})
