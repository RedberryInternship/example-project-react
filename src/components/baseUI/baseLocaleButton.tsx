import React from 'react'

import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native'

import {Colors} from 'utils'

type LocaleButton = {
  onPress: (event?: GestureResponderEvent) => void | undefined
  text: string
  style?: ViewStyle
  textStyle?: TextStyle
}

const baseLocaleButton = ({onPress, style, text, textStyle}: LocaleButton) => {
  return (
    <View style={[{width: 50}, style]}>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.localeUiContainer]}>
          <Text style={[styles.localeText, textStyle]}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default baseLocaleButton

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
