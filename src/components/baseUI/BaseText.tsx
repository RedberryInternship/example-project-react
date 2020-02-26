import React, {ReactElement} from 'react'
import {Text, TextProps, StyleSheet} from 'react-native'
import {Colors} from 'utils'

interface BaseTextPropType extends TextProps {
  children: string | Element
  style: any
}
const BaseText = (props: BaseTextPropType): ReactElement => {
  const setFontFamily = (): string => {
    if ('fontFamily' in props.style) {
      return props.style?.fontFamily
    }

    return 'HelveticaNeueLTStd-Ex'
  }

  const fontFamily = setFontFamily()

  return (
    <Text {...props} style={[styles.text, fontFamily, props.style]}>
      {props.children}
    </Text>
  )
}

export default BaseText

const styles = StyleSheet.create({
  text: {
    letterSpacing: 0.2,
    color: Colors.primaryWhite,
    fontSize: 13,
  },
})
